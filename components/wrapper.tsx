'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import { Button } from './ui/button';
import Link from 'next/link';
import SignoutButton from './ui/signoutButton';
import { useAuth } from './authProvider';

const SECTION_DATA = [
  { label: 1, href: '/', isFirst: true, isLast: false },
  { label: 2, href: '/page-2', isFirst: true, isLast: false },
  { label: 3, href: '/page-3', isFirst: false, isLast: true },
];

export default function Wrapper({ show, children }: any) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [nextPage, setNextPage] = useState<undefined | string>('/');
  const [previousPage, setPreviousPage] = useState<undefined | string>('/');
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const activeSection = SECTION_DATA.find(
    (section) => section.href === pathname,
  );

  useEffect(() => {
    if (activeSection?.isFirst || activeSection?.isLast == false) {
      setNextPage(`page-${currentIndex + activeSection.label}`);
    } else {
      setPreviousPage(`page-${Math.abs(currentIndex - activeSection?.label!)}`);
    }
  }, [
    activeSection?.isFirst,
    activeSection?.isLast,
    activeSection?.label,
    currentIndex,
  ]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        {!show && (
          <Link href="/" className={`flex items-center text-2xl font-bold `}>
            <span
              className={`text-sm font-bold group ml-1 mt-2 inline-block rounded-3xl px-6 py-2 transition ease-in-out hover:bg-gray-800 dark:hover:bg-gray-200 bg-black border border-white text-white dark:bg-[#fafafa] dark:text-black `}
            >
              .LLAMA
            </span>
          </Link>
        )}
        {show && <div />}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && <SignoutButton />}
        </div>
      </div>

      {children}
      <div className="flex w-full items-center justify-between">
        {!show && (
          <>
            <Link href={previousPage as string} passHref>
              <Button
                // disabled
                className={`text-sm font-bold rounded-3xl hover:bg-gray-600 bg-gray-500 dark:bg-gray-500  `}
              >
                Back
              </Button>
            </Link>
            <div
              className={`text-xs font-bold py-2 group-hover:bg-[#e1ffe1c5] text-black dark:text-white `}
            >
              <p className="text-xs ">
                <span className="inline-block ">
                  {pathname === activeSection?.href
                    ? activeSection.label
                    : null}
                </span>
                <span className="inline-block px-3 opacity-50">/</span>
                <span className="inline-block opacity-50">
                  {SECTION_DATA.length}
                </span>
              </p>
            </div>
            <Link href={nextPage as string} passHref>
              <Button
                className={`text-sm px-7 py-2 bg-[#FFD700] hover:bg-yellow-400 dark:hover:bg-green-600 text-[#333] dark:text-white dark:bg-[#4CAF50] font-bold rounded-3xl `}
              >
                Next
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
