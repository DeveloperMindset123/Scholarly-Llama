import { useEffect } from "react";
import { useAuth } from "./authProvider";
import { useRouter } from "next/router";
export default function ProtectedRoute({children}:any){
    const {isLoading, isAuthenticated} = useAuth();
    const router = useRouter();
    if(isLoading){
        return(
            <p>Loading...</p>
        )
    }else{
        if (!isAuthenticated && (router.pathname.includes('/dashboard'))) {
            router.push('/404');
        }else{
            return children
        }

    }

       

    
    
}