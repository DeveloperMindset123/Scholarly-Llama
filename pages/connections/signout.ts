import { supabase } from "@/lib/initSupabase";

export async function signOut() {
    const SignOut = await supabase.auth.signOut();  //this function will handle signout
}