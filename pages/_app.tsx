import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import routes from 'next-routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from "@/components/provider";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function getUserStatus(token: string | null) {  
  if (token === 'user') {
    return 'user'  //users should be redidetected to the dashboard page
  } else { 
    return 'guest'  //guests should be redirected back to the login page
  }
}

function getRequiredStatus(pathname: string) {
  if (pathname === '/dashboard') {
    return 'user'
  } else {
    return 'guest'
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {

  //configuration for supabase
  const router = useRouter();

  function checkAuth() {
    const token = localStorage.getItem('token');
    const userStatus = getUserStatus(token);
    const requiredStatus = getRequiredStatus(router.pathname);
    
    //handle logic for preotected pages
    if (userStatus != requiredStatus) {
      if (userStatus == 'guest') {
        router.replace('/login')  //redirect guests to login pages
      } else {
        router.replace('/dashboard')  //otherwise, redirect user to dashboard
      }
    }
  }

  useEffect (() => {
    checkAuth()  //call on the authentication function defined above
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      checkAuth()
    }
    router.events.on('routeChangeStart', handleRouteChange);
  }, [])
  
  return (
    <>
      <Provider attribute="class" defaultTheme="system" enableSystem>
      <main className={inter.variable}>
        <Component {...pageProps} />
      </main>
      </Provider>
    </>
  );
}


