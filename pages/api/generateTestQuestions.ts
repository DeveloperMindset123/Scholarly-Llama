//current working code
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
//import { makeChain } from '@/utils/makechain';
import type { VectorStoreRetriever } from 'langchain/vectorstores/base';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { pinecone } from '@/utils/pinecone-client';
import { ChatPromptTemplate } from 'langchain/prompts';
import { RunnableSequence } from 'langchain/schema/runnable';
import { ChatOpenAI } from 'langchain/chat_models/openai';


const CONDENSE_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Follow Up Input: {question}
Standalone question:`;

const QA_TEMPLATE = `You are a AI with immense knowledge on the given context which is a book. Use the following pieces of context from the book to generate 5 multiple choice questions alongside a list that will contain all the correct answers for each of the questions.

<context>
  {context}
</context>

Question: {question}

Questions and Answers:

Helpful questions and answers in markdown, and readable format:`;  //adjust the number of questions as needed, since generating more questions takes longer time, I kept it to 5 questions for now

const combineDocumentsFn = (docs: Document[], separator = '\n\n') => {
    const serializedDocs = docs.map((doc) => doc.pageContent);
    return serializedDocs.join(separator);
  };
  
  export const makeChain = (retriever: VectorStoreRetriever) => {
    const condenseQuestionPrompt =
      ChatPromptTemplate.fromTemplate(CONDENSE_TEMPLATE);
    const answerPrompt = ChatPromptTemplate.fromTemplate(QA_TEMPLATE);
  
    const model = new ChatOpenAI({
      temperature: 0.0, // increase temperature to get more creative answers
      modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
    });
  
    // Rephrase the initial question into a dereferenced standalone question based on
    // the chat history to allow effective vectorstore querying.
    const standaloneQuestionChain = RunnableSequence.from([
      condenseQuestionPrompt,
      model,
      new StringOutputParser(),
    ]);
  
    // Retrieve documents based on a query, then format them.
    const retrievalChain = retriever.pipe(combineDocumentsFn);
  
    // Generate an answer to the standalone question based on the chat history
    // and retrieved documents. Additionally, we return the source documents directly.
    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
          (input) => input.question,
          retrievalChain,
        ]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
      new StringOutputParser(),
    ]);
  
    // First generate a standalone question, then answer it based on
    // chat history and retrieved context documents.
    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        question: standaloneQuestionChain,
        chat_history: (input) => input.chat_history,
      },
      answerChain,
    ]);
  
    return conversationalRetrievalQAChain;
  };
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const question = 'generate 20 multiple choice questions'
    const { bookNamespace } = req.body;
    const PINECONE_INDEX_NAME = 'scholar-llama';
    //only accept post requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
  
    if (!question) {
      return res.status(400).json({ message: 'No question in the request' });
    }
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
  
    try {
      const index = pinecone.Index(PINECONE_INDEX_NAME);
  
      /* create vectorstore*/
      const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({}),
        {
          pineconeIndex: index,
          textKey: 'text',
          namespace: bookNamespace, //namespace comes from your config folder
        },
      );
  
      // Use a callback to get intermediate sources from the middle of the chain
      let resolveWithDocuments: (value: Document[]) => void;
      const documentPromise = new Promise<Document[]>((resolve) => {
        resolveWithDocuments = resolve;
      });
      const retriever = vectorStore.asRetriever({
        callbacks: [
          {
            handleRetrieverEnd(documents) {
              resolveWithDocuments(documents);
            },
          },
        ],
      });
  
      //create chain
      const chain = makeChain(retriever);
  
      /*
      const pastMessages = history
        .map((message: [string, string]) => {
          return [`Human: ${message[0]}`, `Assistant: ${message[1]}`].join('\n');
        })
        .join('\n');
  */
      //Ask a question using chat history
      const response = await chain.invoke({
        question: sanitizedQuestion,
        chat_history: '',
      });
  
      const sourceDocuments = await documentPromise;
      // 
  
      console.log('response', response);
      res.status(200).json({ text: response, sourceDocuments });
    } catch (error: any) {
      console.log('error', error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  }




      