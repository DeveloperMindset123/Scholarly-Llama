import { useEffect, useState } from 'react';
import { supabase } from 'lib/initSupabase';
import { getURL } from 'next/dist/shared/lib/utils';

export default async function SignInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: getURL() // function to get your URL
        }
    })
}
