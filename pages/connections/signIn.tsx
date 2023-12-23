import { useEffect, useState } from 'react';
import { supabase } from 'lib/initSupabase';
import { getURL } from 'next/dist/shared/lib/utils';

//found the issue regarding why signin wasn't working as intended
/*
const getUrl = () => {
    let url = 
}*/

export default async function SignInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/dashboard' // added the redirectTo line helped fix the issue with the authentication flow --> reference: https://supabase.com/docs/reference/javascript/auth-signinwithoauth?example=sign-in-using-a-third-party-provider-with-redirect
        }
    })
}
