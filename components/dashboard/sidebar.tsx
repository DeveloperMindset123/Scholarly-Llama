'use client'
import { supabase } from "@/lib/initSupabase"
import { useEffect, useState } from "react"
import LoadingDots from "../ui/LoadingDots";
import Link from "next/link";
import { useBooks } from "./layout";

function Element({book, props}: any){
    return(
        <Link href={`/dashboard/${book.namespace}`}>
            <div className={`${props}  hover:bg-gray-200  rounded-lg p-[0.35rem] cursor-pointer`}>{book.title }</div>
        </Link>
    )
}

export default function Sidebar({loading}:any){
    const {activeChat, books} = useBooks();
    return(
        <>
            {loading && <LoadingDots style="big" color="grey" props={"ml-20"}/>}
            {!loading && books.map((book:any, index:any) => (
                <Element props={activeChat == book.namespace ? "bg-gray-200" : "bg-none"} key={index} book={book}/>
            )
            )}
        </>
    )
}