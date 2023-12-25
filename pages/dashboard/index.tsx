'use client'
import Wrapper from '@/components/wrapper';
import DashboardButton2 from '@/components/ui/dashboardButton2';  //this button will be used to handle signout functionality

import { useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/authProvider';

function Box({text}:any){
    return (
        <div className='bg-white h-40 min-w-[20rem] rounded-md flex-1 flex justify-center items-center'>
            <h3 className='text-black text-xl'>{text ? text :"How to be a straight A student"}</h3>
        </div>
    )
}


export default function Dashboard( ) {
    const{user } = useAuth();
    return (
        <section className="flex flex-col lg:flex-row">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
             <Wrapper show={true}>
                <div className='flex flex-row flex-wrap px-16 mt-[7rem] gap-14 '>
                    {/* <p></p> */}
                    <Box text={"+ Add PDF"}/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                    <Box/>
                </div>
                <div>
                <DashboardButton2 />
                </div>
            </Wrapper >
        </section>
        </section>
    )
    }

