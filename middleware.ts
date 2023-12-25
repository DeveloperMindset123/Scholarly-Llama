//the scope of this file is to create protected routes for users
//handles protected route
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res })
  // Check if we have a session
  
// const { data, error } = await supabase.auth.getSession()
  // console.log(data);
  // console.log(error)
  // console.log(localStorage.getItem('oauth_provider_token'))
  // Check auth condition
  // if (data?.user.email?.endsWith('@gmail.com')) {
  //   // Authentication successful, forward request to protected route.
  //   console.log('auth succesful');
  //   return res
  // }
  // useEffect(() => {
  //   (async()=>{
    const {
      data: { user },
    } = await supabase.auth.getUser()
      // const { data, error } = await supabase.auth.getSession()
      // console.log(data)
      console.log('user:', user)
  //   })()
  // })

  // Retrieve user data from local storage
  const userData = window.localStorage.getItem('user');

  // Auth condition not met, redirect to home page.
  // const redirectUrl = req.nextUrl.clone()
  // console.log(redirectUrl);
  // redirectUrl.pathname = '/404'  //the homepage being http://localhost:3000/
  // redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  // return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: '/middleware-protected/:path*',
}