'use client'
import Wrapper from '@/components/wrapper';
import DashboardButton2 from '@/components/ui/signoutButton';  //this button will be used to handle signout functionality

import { useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/authProvider';
import { FileEarmarkPlus, PencilSquare } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Page from './textbooks/[slug]';

function Box({text}:any){
    return (
        <div className=' ease-in-out delay-100 h-60 min-w-[20rem] rounded-md flex-1 flex-col justify-center items-end scale-100 hover:scale-105 cursor-pointer transition-all'>
            <div className='bg-[#fafafa] w-[100%] rounded-b-none h-[70%] rounded-lg'>

            </div>
            <div className='h-[30%] flex items-center truncate  justify-center rounded-lg rounded-t-none bg-[#fafafa] dark:bg-[#111] w-[100%]'>
                <h3 className='text-white text-xl '>{text ? text :"PDF"}</h3>
            </div>
        </div>
    )
}


export default function Dashboard( ) {
    const{user } = useAuth();
    const { theme } = useTheme();
    const name = user.user_metadata.full_name
    return (    
    <>
    <div className="w-48 bg-[#fafafa] h-[100%] flex-col justify-center items-start gap-6 pr-2  fixed">
        <div className='flex mt-2 ml-2 items-center justify-between text-black p-2  rounded-xl cursor-pointer hover:bg-gray-200'>
            <span className={`text-sm font-bold rounded-3xltext-black`}>
                <span className="">.LLAMA</span>
            </span>
            <PencilSquare className='text-black text-xl '/>
        </div>

        <div className='mt-10 ml-2 text-black w-[92%]  flex-col truncate text-sm'>
            <div className='hover:bg-gray-200 rounded-lg p-[0.25rem] pt-[0.25rem] cursor-pointer'>Automata Theory</div>
            <div className='hover:bg-gray-200 rounded-lg p-[0.25rem] pt-[0.25rem] cursor-pointer blur-right'>How to be an A+ Student for ur monka</div>
        </div>
      
    </div>
    <section className="flex flex-col lg:flex-row ml-48">
            <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
                <Wrapper show={true}>
                    <Page/>
                </Wrapper>
            </section>
        </section>
        </>
    )
    }

