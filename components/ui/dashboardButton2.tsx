import { Button } from "@/components/ui/button";
import { signOutWithGoogle } from "@/pages/connections/signout";
import { toast } from 'react-toastify';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

//this file will be used to implement the signout functionality
export default function DashboardButton2(){  //originally it was dashboard button 2
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
        <Link href={"/"}>
            <Button className="absolute bottom-10 right-10 w-64 h-12 px-6 mt-6 text-indigo-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
             variant="brand" onClick={() => {
                toastNotification({title: 'Signing Out...'})
                signOutWithGoogle();  //when this button is clicked, user will be redirected back to the homepage
            }}>
               <FontAwesomeIcon icon={faArrowRightFromBracket} />  Sign Out  {/**Implement signout functionality button */}
            </Button>
        </Link>
    )
}