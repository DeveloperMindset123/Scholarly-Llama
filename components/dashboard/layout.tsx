import Link from 'next/link';
import { PencilSquare } from 'react-bootstrap-icons';
import Sidebar from './sidebar';
import Wrapper from '../wrapper';
import { supabase } from '@/lib/initSupabase';
import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import Styles from '@/styles/home.module.css';
import { useAuth } from '../authProvider';

const BooksContext = createContext<any>(null);

export default function Layout({ children }: any) {
  const [books, setBooks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeChat, setActiveChat] = useState<any>('');
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('books').select();

      data?.reverse();
      setBooks(data);
      setLoading(false);
    })();
  }, []);

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
          <span className={`text-sm font-bold rounded-3xltext-black`}>
            <span className="">.LLAMA</span>
          </span>
          <PencilSquare className="text-black dark:text-white text-xl " />
        </Link>

        <div
          className={`${Styles.hideScrollbar} pr-2  h-[88%] overflow-y-scroll overflow-x-hidden`}
        >
          <div
            className={`pt-10   text-black w-[100%] flex-col  text-clip whitespace-nowrap  overflow-x-hidden text-sm `}
          >
            <Sidebar loading={loading} />
          </div>
        </div>
        <div className="text-black dark:text-white text-sm  font-thin flex gap-[0.35rem] items-center h-14 w-full truncate">
          <img
            className="inline-block h-8 w-8 rounded-full ml-[0.35rem]"
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
