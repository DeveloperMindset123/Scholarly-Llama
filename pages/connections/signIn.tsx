import { useEffect, useState } from 'react';
import { supabase } from 'lib/initSupabase';
import { getURL } from 'next/dist/shared/lib/utils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'



export default async function SignInWithGoogle() {

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
          redirectTo: 'http://localhost:3000/dashboard',
          queryParams: {
              prompt: 'consent',
          },    
      },
    });
    
  }
