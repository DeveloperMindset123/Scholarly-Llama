/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/base.css';
import { useAuth } from '@/components/authProvider';
import { Inter } from 'next/font/google';
import routes from 'next-routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from "@/components/provider";
import { supabase } from "@/lib/initSupabase";
import { AuthProvider } from '@/components/authProvider';
import { handleAuthChange, AuthTokens, checkTokens } from './connections/authUtils';  //import the two things we will be using 
import { type AppProps } from 'next/app'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import ProtectedRoute from "@/components/protectedRoute"
import { useState } from 'react'
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});


 export default function MyApp({
  Component,
  pageProps,
}: any) { 

  const getLayout = Component.getLayout ?? ((page:any) => page)
  return (
    <>
      <Provider attribute="class" defaultTheme="system" enableSystem>
     
      <main className={inter.variable}>
      <AuthProvider>
        <ProtectedRoute>
          {getLayout(<Component {...pageProps} />)}
        </ProtectedRoute>
        </AuthProvider>
      </main>
      </Provider>
    </>
  );
}



