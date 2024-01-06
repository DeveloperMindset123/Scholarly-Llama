import type { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from '@/utils/makechain';
import { pinecone } from '@/utils/pinecone-client';

export default async function handler(
  req: any,
  res: any,
) {
  const { question, history, bookNamespace } = req.body;
  const PINECONE_INDEX_NAME = 'scholar-llama';

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  const cleansedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: bookNamespace, 
      },
    );

    let documentsPromise: (value: Document[]) => void;

    const vectorRetriever = vectorStore.asRetriever({
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            documentsPromise(documents);
          },
        },
      ],
    });

    const chain = makeChain(vectorRetriever);

    const pastMessages = history
      .map((message: [string, string]) => {
        return [`Human: ${message[0]}`, `Assistant: ${message[1]}`].join('\n');
      })
      .join('\n');

    const response = await chain.invoke({
      question: cleansedQuestion,
      chat_history: pastMessages,
    });

    res.status(200).json({ text: response });
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}

