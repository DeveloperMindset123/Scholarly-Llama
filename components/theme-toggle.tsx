"use client";
//this 

import React from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";
import {Button} from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex border items-center bg-[#fafafa] shado dark:bg-[#111] dark:border-zinc-800 p-2 px-4 w- justify-between rounded-full">
      <Button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "system"
            ? "bg-white dark:bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => setTheme("system")}
      >
        <Icons.monitor classes="" />
      </Button>
      <Button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "dark"
            ? "bg-white dark:bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => setTheme("dark")}
      >
        <Icons.moon />
      </Button>
      <Button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "light"
            ? "bg-white dark:bg-[#333] text-zinc-700 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => setTheme("light")}
      >
        <Icons.sun />
      </Button>
    </div>
  );
}