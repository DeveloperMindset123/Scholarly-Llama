'use client'
import { supabase } from "@/lib/initSupabase"
import { useEffect, useState } from "react"
import LoadingDots from "../ui/LoadingDots";
import Link from "next/link";

function Element({books}: {books:any}){
    return(
        <Link href={`/dashboard/${books.namespace}`}>
            <div className='hover:bg-gray-200 rounded-lg p-[0.25rem] pt-[0.25rem] cursor-pointer'>{books.title}</div>
        </Link>
    )
}

export default function Sidebar(){
    const [loading, setLoading] = useState<boolean>(true);
    const [books, setBooks] = useState<any>([]);
    
    useEffect(()=>{
        (async () => {
            const { data, error } = await supabase
            .from('books')
            .select()

            setBooks(data);
            setLoading(false);
        })()
       
    },[])

    return(
        <>
            {loading && <LoadingDots color="black" props={"ml-20"}/>}
            {!loading && books.map((book:any, index:any) => (
                <Element key={index} books={book}/>
            )
            )}
        </>
    )
}