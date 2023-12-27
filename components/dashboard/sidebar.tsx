'use client';
import { supabase } from '@/lib/initSupabase';
import { useEffect, useState } from 'react';
import LoadingDots from '../ui/LoadingDots';
import Link from 'next/link';
import { useBooks } from './layout';

function Element({ book, props }: any) {
  return (
    <Link href={`/dashboard/${book.namespace}`}>
      <div
        className={`${props} hover:bg-gray-200 dark:hover:bg-gray-900 hover:z-10 hover:relative dark:text-white  transition-all ease-in-out rounded-lg p-[0.35rem] cursor-pointer`}
      >
        {book.title}
      </div>
    </Link>
  );
}

export default function Sidebar({ loading }: any) {
  const { activeChat, books } = useBooks();
  return (
    <>
      {loading && <LoadingDots style="big" color="grey" props={'ml-20'} />}
      {!loading &&
        books.map((book: any, index: any) => (
          <Element
            props={
              activeChat == book.namespace
                ? 'bg-gray-200 dark:bg-gray-900 z-10 relative'
                : 'bg-none'
            }
            key={index}
            book={book}
          />
        ))}
      <div className="absolute w-[96%] top-[6rem] -mt-10 pointer-events-none   bg-gradient-to-r from-transparent from-[65%] via-transparent dark:to-black  to-[#fafafa] to-[90%] h-[100%]" />
    </>
  );
}
