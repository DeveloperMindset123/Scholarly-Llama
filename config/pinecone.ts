/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */

// if (!process.env.PINECONE_INDEX_NAME) {
//   throw new Error('Missing Pinecone index name in .env file');
// }
import {v4} from 'uuid';


const myUUID = v4();

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'scholarlyllama';


const PINECONE_NAME_SPACE = myUUID; //namespace is optional for your vectors, might have
//to change this to

export { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE };
