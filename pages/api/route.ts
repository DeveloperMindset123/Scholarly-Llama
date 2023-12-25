import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
  
    if (code) {
      await supabase.auth.exchangeCodeForSession(code)
    }
  
    return NextResponse.redirect(new URL('middleware-protected/dashboard', req.url));
}

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
    if (session) {
      await supabase.auth.signOut()
    }
  
    return NextResponse.redirect(new URL('/', req.url), {  //redirect the user back to the homepage
      status: 302,
    })
  }