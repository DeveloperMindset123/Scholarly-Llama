import { Button } from '@/components/ui/button';
import { signOutWithGoogle } from '@/pages/connections/signout';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function SignoutButton() {
  return (
    <Link href={'/'}>
      <Button
        className=" w-[2.2rem] h-[2.2rem]  text-indigo-100 hover:text-red-200 dark:hover:text-red-600 flex items-center dark:transition-all dark:ease-in-out transition-all ease-in-out duration-150 bg-black rounded-full"
        variant="brand"
        onClick={() => {
          signOutWithGoogle();
        }}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </Button>
    </Link>
  );
}
