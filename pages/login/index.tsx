/* eslint-disable react-hooks/exhaustive-deps */
//this will be the login page

import { useRouter } from "next/router";  //import the useRouter
import { useCallback, useEffect } from "react";

export default function Login() {
    /**Logic: We want to perform one-time redirection from 'http://localhost:3000/' to 'http://localhost:3000/Login' only when the user initially visits the root URL, using the useEffect hook on the login component
     */
    const router = useRouter();
    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify({
                /**Form Data  --> will be added later */ 
            }),
        }).then((res) => {
            //do a fast client-side transition to the already prefetched dashboard page
            if (res.ok) router.push('/')  //since we want the user 
        })
    }, [])
    
    useEffect(() => {
        //Prefetch the dashboard page
        router.prefetch('/')
    }, [router])
    return (
        <form onSubmit={handleSubmit}>
            {/**Form fields */}
            <button type="submit">Login with Google</button>
        </form>
    )
}

