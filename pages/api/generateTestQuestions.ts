//Note: At the moment, this function is a pseudocode representation and will not work without proper OpenAI integration.
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/initSupabase";  //import the supabase component
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PINECONE_INDEX_NAME } from "@/config/pinecone";
import { makeChain } from "@/utils/makechain";
import { pinecone } from "@/utils/pinecone-client";  //initializes pinecone, as defined in pinecone-client.ts
import { CustomPDFLoader } from "@/utils/customPDFLoader";
import { VectorStoreRetriever } from "langchain/vectorstores/base";

/**
 * Outline in regards to what needs to be done here:
 * 1. Retrieve the most recent PDF from supabase
 * 2. Parse the PDF to extract its text
 * 3. Use a language model to generate questions from the text
 */


// Let's say this function is supposed to be an API handler
export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    //esnure we are handling a post request
    if (req.method !== 'POST') {
        return res.status(405).end('Method not allowed');
    }

    try {
        //note, the code below attempts to manually load and process the pdf, however, I believe it would be better for us to utilize the processPdf.ts function instead
        //call process PDF to get the most recent PDF and process it
        const processResponse = await fetch('/api/processPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //include any additional neccessary headers
            },
            body: JSON.stringify({
                //include the neccessary body content
                bookNamespace: req.body.bookNamespace,  //retrieve the book namespace
                history: req.body.created_at,  //access the created at column
            }),
        });

        const processData = await processResponse.json();  //process the resulting response
        if (!processResponse.ok) {
            throw new Error(processData.error || 'Failed to process PDF');
        }

        //Assuming processData contians the processed documents
        const context = processData.docs.map(doc => doc.pageContent).join(' ');

        //Initialize pinecone client and create a vectorStoreRetriever
        const vectorStoreRetriever = new VectorStoreRetriever({
            vectorStore: pinecone.index('scholar-llama').fetch();  // use the pinecone index name here
        })
        //use the context to generate questions with makechain
        const chain = makeChain(vectorStoreRetriever);
        const questions = await chain.run({
            question: 'Generate 20 multiple-choice questions based on the following text:',
            context: context,
            chat_history: '', //leave it empty for now
        })

        //send the generated questions back to the client
        res.status(200).json( { questions });

        //I will comment out the remaining code of the try body for now
        /*

        //retrieve the most recent PDF from supabase --> use the timestamp column we will sort in descending order
        const { data: pdfList, error: listError } = await supabase.storage.from('pdfs').list('', { sortBy: { column: 'created_at', order: 'desc' }});

        if (listError || !pdfList || pdfList.length === 0) {
            return res.status(500).json({ error: 'Failed to retrieve PDF list from supabase'});  //this will indicate the fetch was unsuccessful
        }

        //Assuming the most recent PDF is the first in the sorted list, we will need to download the most recent pdf after determining if it was successfully retrieved from supabase or not
        const mostRecentPDF = pdfList[0];
        const { data: pdfData, error: pdfError } = await supabase.storage.from('pdfs').download(mostRecentPDF.name);

        if (pdfError || !pdfData) {
            return res.status(500).json({ error: 'Failed to download PDF from supabase'})
        }

        //parse the PDF to extract text
        const loader = new CustomPDFLoader(pdfData);
        const loadedPdf = await loader.load();

        //combine the text into a loaded pdf
        const context = loadedPdf.map(doc => doc.pageContent).join(' ');

        //Now you have your text from the PDF in loadedPDF
        //You'd have to pass this to the model to generate questions
        //Assuming makechain is set up to use a GPT model to generate questions
        //const chain = makeChain(/**retriever setup, use own model to generate questions )
        const questions = await chain.run({
            //...parameters for GPT model call, including the loaded PDF text as context
        });

        //send the generated questions back to the client
        res.status(200).json( {questions }); */
    } catch(error: any) {
        console.error('Error', error);
        res.status(500).json( {error: error.message || 'Something went wrong'});  //either print the error message with the status code 500 or simply output 'Something went wrong' on the console
    }}





/*
        // The namespace is typically known and should be provided as part of the request
        // or through some other means of identifying which PDF's data you're working with.
        const PINECONE_INDEX_NAME = req.body.bookNamespace || 'scholar-llama';

        // Initialize the index
        const index = pinecone.index(PINECONE_INDEX_NAME);

        // DescribeIndexStats might be used if you need to get metadata about the namespaces
        // For example, to verify that the namespace exists or to get the count of vectors
        const stats = await index.describeIndexStats();
        console.log(stats);

        // If you have the IDs of the vectors you want to query, use fetch
        // Here, I'm assuming you have a way of knowing these IDs
        const vectorIDs = ['1', '2', '3', '4', '5']; // This should be dynamic based on your application logic
        const fetchResult = await index.fetch(vectorIDs);

       // Now you have your vectors either from fetchResult or queryResponse
        // You can use these vectors as context for your GPT model to generate questions --> retrieve the vectors, use them as input on the GPT model

        // ... (GPT-3 API call to generate questions using vectors as context)
        res.status(200).json({ /* ...response with generated questions... });  //plcaeholder function at the moment
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Failed to generate test questions' });
    } */
