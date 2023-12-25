import { useEffect, useState } from 'react';
import { supabase } from 'lib/initSupabase';
import { getURL } from 'next/dist/shared/lib/utils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

//found the issue regarding why signin wasn't working as intended
/*
const getUrl = () => {
    let url = 
}*/

export default async function SignInWithGoogle() {
    // Add an event listener to handle changes in authentication state
 
  
    // Trigger the sign-in with OAuth
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // redirectTo: 'http://localhost:3000/middleware-protected/dashboard',
        queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },    
      },
    });

    if (data) {
        // Store user data in local storage
        window.localStorage.setItem('user', JSON.stringify(data));
      }

    
  }


// export async function GET(req: NextRequest) {
//     const cookieStore = cookies()
//     const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
//     const { searchParams } = new URL(req.url)
//     const code = searchParams.get('code')
  
//     if (code) {
//       await supabase.auth.exchangeCodeForSession(code)
//     }
  
//     return NextResponse.redirect(new URL('middleware-protected/dashboard', req.url))
//   }