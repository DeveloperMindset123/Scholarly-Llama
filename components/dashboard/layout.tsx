import Link from "next/link";
import { PencilSquare } from "react-bootstrap-icons";
import Sidebar from "./sidebar";
import Wrapper from "../wrapper";

export default function Layout({children}:any){
    return(
        <>
        <div className="w-48 bg-[#fafafa] h-[100%] flex-col justify-center items-start gap-6 pr-2  fixed">
            <Link href='/dashboard' className='flex mt-2 ml-2 items-center justify-between text-black p-2  rounded-xl cursor-pointer hover:bg-gray-200'>
                <span className={`text-sm font-bold rounded-3xltext-black`}>
                    <span className="">.LLAMA</span>
                </span>
                <PencilSquare className='text-black text-xl '/>
            </Link>
    
            <div className='mt-10 ml-2 text-black w-[92%]  flex-col truncate text-sm'>
                <Sidebar/>
            </div>
          
        </div>
        <section className="flex flex-col lg:flex-row ml-48">
            <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
                <Wrapper show={true}>
                    {children}
                </Wrapper>
            </section>
    </section>
        </>
    )
}