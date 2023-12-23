import { Button } from "@/components/ui/button";
import SignInWithGoogle from "@/pages/connections/signIn";
import { toast } from 'react-toastify';
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
export default function DashboardButton(){
    /*
    function toast(arg0: { title: string; }) {
        throw new Error("Funct");
    }
*/
    function toastNotification({ title }: { title: string }) {
    // Use the toast function from the library to display the notification
        (title);
  }
    return(
        
            <Button size="xl" className="w-full font-bold" variant="brand" onClick={() => {
                toastNotification({title: 'Redirecting...'})
                SignInWithGoogle()
                //redirect('/dashboard', 'push')
            }}>
                Get Started
            </Button>
    )
}