import { Button } from "@/components/ui/button";
import { signOutWithGoogle } from "@/pages/connections/signout";
import { toast } from 'react-toastify';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function DashboardButton2(){  

    return(
        <Link href={"/"}>
            <Button className="absolute bottom-10 right-10 w-64 h-12 px-6 mt-6 text-indigo-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
             variant="brand" onClick={() => {
                signOutWithGoogle(); 
            }}>
               <FontAwesomeIcon icon={faArrowRightFromBracket} />  Sign Out  
            </Button>
        </Link>
    )
}