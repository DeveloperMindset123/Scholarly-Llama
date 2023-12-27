"use client";

import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import DashboardButton  from "@/components/ui/dashboardButton"
import boyAndGirl from "@/public/coolLlama.png";
import { useTheme } from "next-themes";

export default function Home() {
    const { theme } = useTheme(); 
  return (
    <section className="flex flex-col lg:flex-row">
      <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
        <Wrapper>
          <div className="mx-auto flex max-w-sm flex-col justify-between">
            <span
              className={`-mt-14 inline-block text-[64px] font-bold ${theme === "dark" ? "dark:text-white" : theme === "system" ? "text-white" : "text-black"}`}
            >
              03
            </span>
            <p className="pb-6 font-medium">
            Generate customized tests from your uploaded textbooks, receive instant scores, and track your progress effortlessly. Watch your knowledge grow and enhance your study routine with a seamless blend of technology and education.
            </p>

            <div className="">
            <DashboardButton/>
            </div>
          </div>
        </Wrapper>
      </section>

      {/* second half */}

      <section className="hidden lg:flex h-screen w-full flex-col justify-center items-center bg-[#ffefd6] p-9">
        <Image src={boyAndGirl} alt="Boy and girl playing with robot" />
      </section>
    </section>
  );
}