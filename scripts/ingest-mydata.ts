import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");

const runa = async () => {
  try {
    // Download the PDF file from Supabase bucket
    const { data, error } = await supabase.storage
      .from('pdfs')
      .download(`path/${PINECONE_NAME_SPACE}`);

    if (error) {
      console.error('Error downloading PDF from Supabase:', error);
      return;
    }

    // Assuming data is a Buffer
    const rawDocs:any = [data];

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    // Create and store the embeddings in the vectorStore
    const embeddings = new OpenAIEmbeddings();
    console.log('test...');

    const index = pinecone.Index(PINECONE_INDEX_NAME); // change to your own index name

    // Embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await runa();
  console.log('ingestion complete');
})();
