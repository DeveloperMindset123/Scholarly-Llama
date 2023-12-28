import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { supabase } from '@/lib/initSupabase';

export default async function handler(req: any, res: any) {
  try {
    console.log('creating vector store...')
    const PINECONE_INDEX_NAME = 'scholar-llama';
    const PINECONE_NAME_SPACE = req.body.bookNamespace;
    const docs = req.body.docs;

    const embeddings = new OpenAIEmbeddings();

    const index = pinecone.Index(PINECONE_INDEX_NAME); 

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ingestion error:', error);
    res.status(500).json({ success: false, error: 'Failed to ingest data' });
  }
}


