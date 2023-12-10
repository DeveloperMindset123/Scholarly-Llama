import { getURL } from "next/dist/shared/lib/utils";
import { supabase } from "../index";

export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: getURL() //function to get URL
        }
    }) 
}