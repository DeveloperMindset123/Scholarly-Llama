/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/base.css';
import { Inter } from 'next/font/google';
import { Provider } from "@/components/provider";
import { AuthProvider } from '@/components/authProvider';
import ProtectedRoute from "@/components/protectedRoute"
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



