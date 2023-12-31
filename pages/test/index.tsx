import React, { useState, useEffect } from "react";
import { TestQuestions } from "@/components/testQuestions";

const TestPage: React.FC = () => {
    const [testQuestions, setTestQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // This should be the namespace of the book for which you want to generate questions
    const bookNamespace = "1dfc6beb-9437-4280-ae97-c3a182acb4fd";

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('/api/generateTestQuestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bookNamespace }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch test questions');
                }

                const data = await response.json();
                console.log(data.questions)
                console.log(data.questions.kwargs.content)
                console.log(data.questions.kwargs.content.trim().split(/(\d+\.)/))
                setTestQuestions(data.questions.kwargs.content.trim().split(/(\d+\.)/));
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [bookNamespace]);

    if (loading) {
        return <div>Loading questions...</div>;
    }

    return (
        <div>
            <h1>Test Page</h1>
            {!loading && (
                <TestQuestions questions={testQuestions} />
            )}
        </div>
    );
};

export default TestPage;

//it seems like the test questions are rendered as intended