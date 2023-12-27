//Note: A test section (on a seperate page) based on the book that gets uploaded, users can take tests and essentially be told how many questions they answered correct vs incorrect
//Additionally, users can choose if they want to take a short response based test or multiple choice, but for now, we will focus mainly on multiple choice tests instead

//for now, I will implement the rendering logic
import React from "react";
import { TestQuestions } from "@/components/testQuestions";


//something to note regarding React.FC: is a type that ships with React's typescript types. It represents the type of a functional compoenent, which is the building block of most modern react apps.
const TestPage: React.FC = () => {
    //Example: Replace this later with the actual logic to fetch test questions
    const fetchTestQuestions = ["What is the capital of France?", "Who wrote Hamlet?", "What year was the declaration of independence signed?"];  //three hardcoded sample questions first to check if the test questions rendered on the page as intended


    return (
        <div>
            <h1>Test Page</h1>
            <TestQuestions questions={fetchTestQuestions} />  {/**call on the component with the array fetchTestQuestions which contains elements composed of strings */}
        </div>
    )
}


export default TestPage;  

//it seems like the test questions are rendered as intended