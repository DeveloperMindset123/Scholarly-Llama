import React, { useState } from 'react';

interface TestQuestionsProps {
    questions: string[]; // This will be an array where each entry is a question and its choices
}

export const TestQuestions: React.FC<TestQuestionsProps> = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState(new Map());
    const [feedbackMessages, setFeedbackMessages] = useState(new Map());

    // Function to split question text and extract choices and correct answer
    const parseQuestion = (questionText: string) => {
        const parts = questionText.split('\n');
        const question = parts[0];
        const choices = parts.slice(1, 5); // Assuming there are always 4 choices a, b, c, d
        const answer = parts[5].split(': ')[1]; // Assuming the answer is always the last line
        return { question, choices, answer };
    };

    // Function to handle answer selection
    const handleAnswerSelection = (questionIndex: number, choice: string) => {
        const { answer } = parseQuestion(questions[questionIndex]);
        const isCorrect = choice.trim() === answer.trim();  //note that the .trim() function is neccessary because the white space was making it wrong

        setSelectedAnswers(new Map(selectedAnswers.set(questionIndex, choice)));
        setFeedbackMessages(new Map(feedbackMessages.set(questionIndex, isCorrect ? 'Correct!' : 'Incorrect, try again.')));
    };

    return (
        <div className="flex flex-col gap-4  items-center  w-full p-6 px-2"> {/*adding p-6 pt-[40%] overflow-y-scroll px-2 fixed the issue regards to scrolling*/}
            <h2 className="text-xl font-medium mb-4">Test Questions</h2>
            <div className='flex flex-col gap-4 mb-20 h-auto w-full p-6 overflow-y-scroll px-2'>
            {questions.map((questionText, index) => {
                    const { question, choices } = parseQuestion(questionText);
                    return (
                        <li key={index} className="bg-white p-4 rounded shadow-md  w-full ">
                            <p className="px-1 py-2font-semibold mb-2">{question}</p>
                            <form className="flex flex-col gap-2">
                                {choices.map((choice, choiceIndex) => (
                                    <label key={choiceIndex} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name={`question_${index}`}
                                            value={choice}
                                            onChange={() => handleAnswerSelection(index, choice)}
                                            checked={selectedAnswers.get(index) === choice}
                                            className="form-radio h-5 w-5"
                                        />
                                        <span className="text-md">{choice}</span>
                                    </label>
                                ))}
                            </form>
                            {feedbackMessages.get(index) && (
                                <p className={`mt-2 text-sm font-semibold ${feedbackMessages.get(index) === 'Correct!' ? 'text-green-600' : 'text-red-600'}`}>
                                    {feedbackMessages.get(index)}
                                </p>
                            )}
                        </li>
                    );
                })}
            </div>
        </div>
    );
};




//test this component with a sample test questions and check if the page rendered as intended