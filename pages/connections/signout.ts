import { supabase } from "@/lib/initSupabase";

export async function signOutWithGoogle() {
   
    const SignOut = await supabase.auth.signOut();  //this function will handle signout --> do we need this? (check api/route.ts)

}