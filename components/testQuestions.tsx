//This will be used to handle the test questions that are generated
import React, { useEffect, useState } from 'react'; //import the react library as it is neccessary in order to create react components

interface TestQuestionsProps { //define a typescript interface TestQuestionProps to describe the expected props for the testQuestion component.
    questions: string[];  //Expect an array of strings representing each test question
}

//define a React functional component named TestQuestions that takes the defined props.
export const TestQuestions: React.FC<TestQuestionsProps> = ({ questions }) => {
    const [qna, setQna] = useState<any>([]);
    useEffect(()=>{
        setQna(questions.map(e=>e.split('Answer: ')))
    },[questions])
    console.log(qna)
    return (  //render a div element as the root container for the element
        <div> 
            <h2>Test Questions</h2> {/**Render a h2 element with the test questions */}
            <ol className='flex flex-col gap-10'> {/**Render an ordered list (ol) element containing test questions. Use the map function to iterate over each question in the questions array.*/}
                {qna && qna.map((question:any, index:any) => {
                   return index % 2 == 0 && <li key={index}>{question[0]}</li> 
                })}
            </ol>
        </div>
    )
}   

//test this component with a sample test questions and check if the page rendered as intended