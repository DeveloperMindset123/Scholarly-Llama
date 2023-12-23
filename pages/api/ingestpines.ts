import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME } from '@/config/pinecone';


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");

export default async function handler(req:any, res:any) {
  const { PINECONE_NAME_SPACE } = req.body;
  try {
  
    const { data, error } = await supabase.storage
      .from('pdfs')
      .download(`public/${PINECONE_NAME_SPACE}.pdf`);

      console.log('Download data:', data);
      console.error('Download error:', error);
      
    if (error) {
      console.error('Error downloading PDF from Supabase:', error);
      return res.status(500).json({ success: false, error: 'Failed to download PDF from Supabase' });
    }

    console.log('hi');

    // Assuming data is a Buffer
    const rawDocs:any = [data];

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    console.log('hi');

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');

    // Create and store the embeddings in the vectorStore
    const embeddings = new OpenAIEmbeddings();
    console.log('test...');

    const index = pinecone.Index(PINECONE_INDEX_NAME); // change to your own index name
    console.log('hi');

    // Embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });

    console.log('hi');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ingestion error:', error);
    res.status(500).json({ success: false, error: 'Failed to ingest data' });
  }
}
