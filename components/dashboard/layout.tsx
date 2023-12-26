import Link from "next/link";
import { PencilSquare } from "react-bootstrap-icons";
import Sidebar from "./sidebar";
import Wrapper from "../wrapper";
import { supabase } from "@/lib/initSupabase";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";


  
const BooksContext = createContext<any>(null);

export default function Layout({children}:any){
    const [books, setBooks] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeChat, setActiveChat] = useState<any>("");

    useEffect(()=>{
        (async () => {
            const { data, error } = await supabase
            .from('books')
            .select()

            data?.reverse()
            setBooks(data);
            setLoading(false)
        })()
       
    },[])

    return(
        <BooksContext.Provider value={{ books, setBooks, activeChat, setActiveChat }}>
        <div className="w-[13rem] bg-[#fafafa] h-[100%] flex-col justify-center items-start gap-6 pr-2  fixed">
            <Link href='/dashboard' className='flex mt-2 ml-2 items-center justify-between text-black p-2  rounded-xl cursor-pointer hover:bg-gray-200'>
                <span className={`text-sm font-bold rounded-3xltext-black`}>
                    <span className="">.LLAMA</span>
                </span>
                <PencilSquare className='text-black text-xl '/>
            </Link>
    
            <div className='mt-10 ml-2 text-black w-[92%]  flex-col truncate text-sm overflow-y-scroll'>
                <Sidebar loading={loading}  />
            </div>
          
        </div>
        <section className="flex flex-col lg:flex-row ml-[13rem]">
            <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
                <Wrapper show={true}>
                    {children}
                </Wrapper>
            </section>
    </section>
    </BooksContext.Provider>
    )
}

export const useBooks = () => useContext(BooksContext);