import Link from 'next/link';
import { PencilSquare, CardChecklist } from 'react-bootstrap-icons';
import Sidebar from './sidebar';
import Wrapper from '../wrapper';
import { supabase } from '@/lib/initSupabase';
import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import styles from '@/styles/Home.module.css';
import { useAuth } from '../authProvider';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';

const BooksContext = createContext<any>(null);

export default function Layout({ children }: any) {
  const [books, setBooks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeChat, setActiveChat] = useState<any>('');
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('books')
        .select()
        .eq('user_id', `${user.id}`);
      data?.reverse();
      setBooks(data);
      setLoading(false);
    })();
  }, [user.id]);

  return (
    <BooksContext.Provider
      value={{ books, setBooks, activeChat, setActiveChat, loading }}
    >
      <div className="w-[13rem] bg-[#fafafa] h-[100%] dark:bg-black flex-col justify-center items-start gap-6 p-2 fixed ">
        <Link
          href="/dashboard"
          className="flex mt-2   items-center justify-between dark:text-white text-black p-2 rounded-xl cursor-pointer  transition-all ease-in-out dark:hover:bg-gray-900  hover:bg-gray-200"
          onClick={() => setActiveChat('')}
        >
          <span className={`text-sm font-bold rounded-3xl text-black dark:text-white`}>
            <span className="">.LLAMA</span>
          </span>
          <PencilSquare className="text-black dark:text-white text-xl " />
        </Link>

        {router.query.slug && (
         <button className='w-[12rem] z-[999] pl-[0.55rem] flex absolute items-center p-2 pt-1 pb-1 gap-[0.35rem] dark:text-white text-black rounded-xl cursor-pointer  transition-all ease-in-out dark:hover:bg-gray-900  hover:bg-gray-200'
         onClick={()=>router.push(`/dashboard/${router.query.slug}/test`)}
         >
           <CardChecklist className='text-[1.45rem] font-light'/>
            <text className='font-light rounded-3xl text-black dark:text-white'>
            Exam
            </text>
         </button>
        )}


        <div
          className={`${styles.hideScrollbar} pr-2 h-[87vh]  overflow-y-scroll overflow-x-hidden`}
        >
          <div
            className={`pt-16   text-black w-[100%] flex-col  text-clip whitespace-nowrap  overflow-x-hidden text-sm `}
          >
            <Sidebar loading={loading} />
          </div>
        </div>
        <div className="text-black dark:text-white text-sm  font-thin flex gap-[0.35rem] justiy-center items-center h-[6vh] w-full truncate">
          <img
            className="h-[3.5vh] w-[3.5vh] rounded-full ml-[0.5rem]"
            src={user.user_metadata.avatar_url}
            alt=""
          />
          {user.user_metadata.name}
        </div>
      </div>
      <section className="flex flex-col lg:flex-row ml-[13rem]">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
          <Wrapper show={true}>{children}</Wrapper>
        </section>
      </section>
    </BooksContext.Provider>
  );
}

export const useBooks = () => useContext(BooksContext);
