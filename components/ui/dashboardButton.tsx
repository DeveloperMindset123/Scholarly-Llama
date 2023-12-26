import { Button } from "@/components/ui/button";
import SignInWithGoogle from "@/pages/connections/signIn";
import { toast } from 'react-toastify';
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { useAuth } from "../authProvider";
import { useRouter } from "next/router";
export default function DashboardButton(){
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    return(
            <Button size="xl" className="w-full font-bold" variant="brand" onClick={() => {
               if(isAuthenticated){
                router.push('/dashboard')
               }else{
                SignInWithGoogle()
               }
            }}>
                Get Started
            </Button>
    )
}