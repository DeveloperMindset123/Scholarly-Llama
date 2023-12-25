/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import routes from 'next-routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from "@/components/provider";
import { supabase } from "@/lib/initSupabase";
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

//code added from tutorial


  //Define the function to get user status based on token
  /* --> commented it out for now as it is messing with the flow of login
  function getUserStatus(token: String | null) {
    return token ? 'user' : 'guest';
  }

  //define the function to get the required status based on the pathname
  function getRequiredStatus(pathname: string) {
    return pathname === '/dashboard' ? 'user' : 'guest';
  } //this will allow us to check for the pathname
  */

export default function MyApp({ Component, pageProps }: AppProps) {

  //configuration for supabase
  //const router = useRouter(); not needed at the moment
  
  /*
  async function checkAuth() {
    const token = localStorage.getItem('token');
    const userStatus = getUserStatus(token);
    const requiredStatus = getRequiredStatus(router.pathname);

    // Handle logic for protected pages
    if (userStatus !== requiredStatus) {
      if (userStatus === 'guest') {
        router.replace('/'); // Redirect guests to login page
      } else {
        router.replace('/dashboard'); // Redirect users to dashboard
      }
    }
  }
*/
  // useEffect (() => {
  //   (async()=>{
  //     checkAuth() 
  //   })()
  //    //call on the authentication function defined above
  // }, [checkAuth])

  /*  --> we won't use this for now
  useEffect(() => {
    checkAuth();
    
    const handleRouteChange = async () => {
      await checkAuth()
    }
    router.events.on('routeChangeStart', handleRouteChange);
  }, [router.events, checkAuth]) 
*/
  //   const handleRouteChange = async () => {
  //     await checkAuth()
  //   }
  //   router.events.on('routeChangeStart', handleRouteChange);
  // }, [router.events, checkAuth]) 

  supabase.auth.onAuthStateChange((event, session) => {
    console.log('_APP.TSX event:',event)
    console.log('_APP.TSX session:',session)
    if (session && session.provider_token) {
      window.localStorage.setItem('oauth_provider_token', session.provider_token)
    }
  
    if (session && session.provider_refresh_token) {
      window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
    }
  
    if (event === 'SIGNED_OUT') {
      window.localStorage.removeItem('oauth_provider_token')
      window.localStorage.removeItem('oauth_provider_refresh_token')
    }
  })
  
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


