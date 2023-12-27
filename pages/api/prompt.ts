import type { NextApiRequest, NextApiResponse } from 'next';
import type { Document } from 'langchain/document';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from '@/utils/makechain';
import { pinecone } from '@/utils/pinecone-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { history, retriever, sanitizedQuestion } = req.body;
  const PINECONE_INDEX_NAME = 'scholar-llama';
  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
    try{
    //create chain
    const chain = makeChain(retriever);

    const pastMessages = history
    .map((message: [string, string]) => {
        return [`Human: ${message[0]}`, `Assistant: ${message[1]}`].join('\n');
    })
    .join('\n');

    //Ask a question using chat history
    const response = await chain.invoke({
    question: sanitizedQuestion,
    chat_history: pastMessages,
    });

    res.status(200).json({ response });
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}


