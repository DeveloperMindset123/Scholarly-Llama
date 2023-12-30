import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/initSupabase";
import { CustomPDFLoader } from "@/utils/customPDFLoader";
import { ChatOpenAI } from "langchain/chat_models/openai";

const QA_TEMPLATE = `You are a AI with immense knowledge on the given context which is a book. Use the following pieces of context from the book to generate 20 multiple choice questions alongside a list that will contain all the correct answers for each of the questions.

<context>
  {context}
</context>

Questions and Answers:`;

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bookNamespace = req.body.bookNamespace;

  try {
    // Retrieve PDF from Supabase
    const { data, error } = await supabase.storage
      .from('pdfs')
      .download(`public/${bookNamespace}.pdf`);

    if (error) {
      throw new Error('Failed to download PDF from Supabase');
    }

    // Load and process PDF
    const loader = new CustomPDFLoader(data);
    const loadedPdf = await loader.load();
    const context = loadedPdf.map(doc => doc.pageContent).join('\n');

    // Use ChatOpenAI to generate questions
    const model = new ChatOpenAI({
      temperature: 0.7, 
      modelName: 'gpt-3.5-turbo', // Or your desired model
    });

    const prompt = QA_TEMPLATE.replace('{context}', context);

    // Ensure the input format matches the expected structure of the model
    const questions = await model.invoke(prompt);

    console.log('Generated Questions:', questions);
    res.status(200).json({ questions });
  } catch (error: any) {
    console.error('Error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}




      