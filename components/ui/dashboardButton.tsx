import { Button } from "@/components/ui/button";
import SignInWithGoogle from "@/pages/connections/signIn";
import { toast } from 'react-toastify';
import Link from "next/link";
import { useTheme } from "next-themes";
import { redirect } from "next/dist/server/api-utils";
export default function DashboardButton(){
    const { theme } = useTheme();
    return(
            <Button size="xl" className="w-full font-bold" variant="brand" onClick={() => {
                // toastNotification({title: 'Redirecting...'})
                SignInWithGoogle()
            }}>
                <span className={theme === "dark" ? "dark:bg-white" : theme === "light" ? "bg-gray-700 px-15 py-5 rounded-md  text-black" : "text-black"}>
                Get Started
            </span>
            </Button>
    )
}