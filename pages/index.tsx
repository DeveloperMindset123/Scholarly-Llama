"use client";

import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import DashboardButton  from "@/components/ui/dashboardButton"
import robot from "@/public/bot-image.png";

//imports for supabase
import { createClient } from "@supabase/supabase-js";

import { supabase } from 'lib/initSupabase';
import { redirect } from "next/dist/server/api-utils";
import SignInWithGoogle from "./connections/signIn";
import { signOutWithGoogle } from "./connections/signout";

// const { data } = await supabase.from('posts').select('*')
// Making infinite load


/**Migrated to lib/initSupabase.js 
const supabasUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabasUrl) throw new Error('Supabase URL not found');  //for debugging pruposes
if (!supabaseAnonKey)  throw new Error('Supabase Anon key not found');  //for debugging purposes in case .env file doesn't recognize it

export const supabase = createClient(supabasUrl, supabaseAnonKey); //accepts two parameters, the supabaseUrl and supabaseAnonKey
*/
//we want the homepage to be preotected

//this is the homepage where we are rediretected to
export default function Home() {

  return (
    <section className="flex flex-col lg:flex-row">
      <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
        <Wrapper>
          <div className="mx-auto flex max-w-sm flex-col justify-between">
            <span
              className={`-mt-14 inline-block text-[64px] font-bold text-black dark:text-white`}
            >
              01
            </span>
            <p className="pb-6 font-medium">
              ScholarlyLlama -  Our friend right here transforms your textbooks into dynamic chatbots, offering a unique and engaging way to explore and understand your course materials.
              
            </p>

            <div className="">
              <DashboardButton />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* second half */}

      <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-[#d6ebe9] p-9">
        <Image src={robot} alt="Man sitting in wheelchair" />
      </section>
    </section>
  );
}

//the following code is intended to protect the dashboard page
//export const config = { matcher: ['/dashboard']};