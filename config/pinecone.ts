/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */

// if (!process.env.PINECONE_INDEX_NAME) {
//   throw new Error('Missing Pinecone index name in .env file');
// }
import { v4 } from 'uuid';

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'scholar-llama';

export { PINECONE_INDEX_NAME };
