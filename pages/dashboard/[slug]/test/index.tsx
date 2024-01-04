import React, { useState, useEffect } from "react";
import { TestQuestions } from "@/components/testQuestions";
import { supabase } from "@/lib/initSupabase";
import { table } from "console";
import Layout, { useBooks } from "@/components/dashboard/layout";
import { useRouter } from "next/router";


const Skeleton = () => {
    return(
        <div className="border shadow rounded-md p-4 w-[100%]">
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
            </div>
            </div>
        </div>
        </div>
    )
}


export default function TestPage() {
    const [testQuestions, setTestQuestions] = useState([]);
    const [bookNamespace, setBookNamespace] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const { setActiveChat, books, loading: loadingBooks } = useBooks();
    const router = useRouter();

    useEffect(() => {
        (async () => {
          if (loadingBooks || books.length == 0 || !router.query.slug) {
            return;
          }
          const filteredArray = books.filter((e: any) => {
            return e.namespace == `${router.query.slug}`;
          });
    
          if (filteredArray.length == 0) {
            router.push('/404');
            return;
          }

          setBookNamespace(`${router.query.slug}`);
          setActiveChat(`${router.query.slug}`);

          const response = await fetch('/api/generateTestQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookNamespace:`${router.query.slug}` }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch test questions');
        }   

        const data = await response.json();

        console.log("Raw Data: ", data);
        const questionsArray = data.text.split('\n\n'); //adjust delimited if neccessary (note: try the kwargs.content.trim().split...) appraoch if this doesn't look right
        
        if (!questionsArray[0].includes('Answer')) {
            return;  //this conditional statement will ensure that the error regarding asking for the context of the book (in the sense that it asks the user that it doesn't have the context and then few seconds later it sends the context will be taken cared of)
        } 
        console.log("Structured Data: ", questionsArray);  //print out the structured data to see the difference

        setTestQuestions(questionsArray); //convert the test 
    
        setLoading(false);
        })();
      }, [router.query.slug, router, setActiveChat, books, loadingBooks]);


    if (loading) {
        return (
            <div className="flex flex-col h-[100vh] gap-8 w-full items-center">
            
            <div className="flex gap-2 items-center">
            <h1 className="font-medium">Generating test questions</h1>
            <div
            className=" h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
            >
            </div>
            </div>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            </div>
        )
    }

    return (
        <div className="flex h-[100vh] w-full -mt-10 justify-center">
            <TestQuestions questions={testQuestions} />
        </div>
    );
};

TestPage.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
  };