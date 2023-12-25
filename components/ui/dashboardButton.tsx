import { Button } from "@/components/ui/button";
import SignInWithGoogle from "@/pages/connections/signIn";
import { toast } from 'react-toastify';
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
export default function DashboardButton(){

    return(
            <Button size="xl" className="w-full font-bold" variant="brand" onClick={() => {
                // toastNotification({title: 'Redirecting...'})
                SignInWithGoogle()
            }}>
                Get Started
            </Button>
    )
}