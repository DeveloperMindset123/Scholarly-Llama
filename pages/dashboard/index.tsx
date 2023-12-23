import Wrapper from '@/components/wrapper';
import DashboardButton2 from '@/components/ui/dashboardButton2';  //this button will be used to handle signout functionality

import { useEffect } from 'react';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';

function Box(){
    return (
        <div className='bg-white h-40 w-40 rounded-md'>
            <p >Just an empty box!</p>
        </div>
    )
}

/*  --> for now, the backend related issues can be handled by Garv, the main priority is for the sign in and signout functionalities to work as intended
const basePath = 'http://locahost:3000';

export async function getServerSideProps() {
  const response = await fetch(`${basePath}/api/getUser`).then((response) => response.json());  //we have not yet defined this route

  const { user } = response;  //save the resulting user information

  //if the 'getUser' endpoint doesn't have a user in its response, then we will redirect the user back to the login page
  //which means this page will only be viewable when 'getUser' returns a user

  if (!user) {
    return {
      redirect: {destination: '/', permanent: false}  //redirect user back to the home page if user doesn't exist
    };
  }
  //we will pass the returned user to the page's react component as a prop
  return { props: { user }};
}*/

export default function Dashboard( {} ) {

  //below is the functionality for the protected routes
  const router = useRouter();

  useEffect(() => {
    //check if the user is authenticated
    const user = supabase.auth.getUser();  //use this function to get user

    //check if user exists or not
    if (!user) {
      //if user is not authenticated, redirect to the login page
      router.push('/404');
    }
    else {
      //if the user does exist
      router.push('/dashboard');
    }

  }, []);
    return (
        <section className="flex flex-col lg:flex-row">
        <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
             <Wrapper show={true}>
                <div className='flex flex-row mt-20'>
                    <p></p>
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

