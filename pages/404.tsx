import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-content-center text-center px-10">
      <p className="stroked mr-7 md:leading-[200px] w-auto py-2 text-6xl font-black md:py-4 md:text-[10rem] transition-all duration-300 ease-linear">
        Hmmm, either your login failed or you did not login before attempting to access the dashboard!
      </p>
      <div className="w-full mx-auto max-w-lg mt-8 md:mt-0">
        <Button size="xl" className="w-full font-bold" variant="brand">
          <Link href="/" className="pb-1 dark:text-zinc-800 text-zinc-100">  {/*ensure that the link it directs to is set to the login page */}
            Take me back to login!
          </Link>{" "}
        </Button>
      </div>
    </div>
  );
}