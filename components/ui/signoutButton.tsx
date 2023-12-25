import { Button } from "@/components/ui/button";
import { signOutWithGoogle } from "@/pages/connections/signout";
import { toast } from 'react-toastify';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function SignoutButton(){  

    return(
        <Link href={"/"}>
            <Button className=" w-8 h-8  text-indigo-100 flex items-center transition-colors duration-150 bg-gray-700 rounded-full focus:shadow-outline hover:text-red-800"
             variant="brand" onClick={() => {
                signOutWithGoogle(); 
            }}>
               <FontAwesomeIcon icon={faArrowRightFromBracket} />  
            </Button>
        </Link>
    )
}