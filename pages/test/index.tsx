import React, { useState, useEffect } from "react";
import { TestQuestions } from "@/components/testQuestions";
import { supabase } from "@/lib/initSupabase";
import { table } from "console";

const TestPage: React.FC = () => {
    const [testQuestions, setTestQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // This should be the namespace of the book for which you want to generate questions
    //const bookNamespace = "1dfc6beb-9437-4280-ae97-c3a182acb4fd";

    const tableName = 'books';
    //fetch data from the table
    async function fetchData() {  //.from(bucketName).list(folderNameWithinBucket) alongside added parameters
        const {data, error} = await supabase.storage.from('pdfs').list('public', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc'},
        })
        if (error) {
            console.error('Error fetching data', error);
            return;
        }
        console.log('Fetched Data: ', data);  //output the object itself
        return data[4].name.replace('.pdf', '');  //remove the .pdf extension

    }


    useEffect(() => {
        const fetchQuestions = async (namespace:any) => {
            try {

                const response = await fetch('/api/generateTestQuestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bookNamespace:namespace }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch test questions');
                }   

                const data1 = await response.json();
                //console.log("Supabase Data: ", data);
                console.log()
                console.log(data1.questions)
                console.log(data1.questions.kwargs.content)
                console.log(data1.questions.kwargs.content.trim().split(/(\d+\.)/))
                setTestQuestions(data1.questions.kwargs.content.trim().split(/(\d+\.)/));
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        const loadQuestions = async () => {
            setLoading(true);
            try {
                const namespace = await fetchData();
                await fetchQuestions(namespace);
            } catch (error) {
                console.error("Error fetching namespace:", error);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();

        //fetchQuestions();
        //fetchData(); //call the fetchData function to see the list of pdf namespaces
    }, []);

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