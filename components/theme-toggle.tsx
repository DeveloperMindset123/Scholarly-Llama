import React, { useEffect } from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("light"); // Default to "light" if no theme is stored
    }
  }, [setTheme]);

  const handleThemeChange = (selectedTheme: any) => {  //set the parameter type to any for now, I beleive it will most likely be a string however
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="flex border items-center bg-[#fafafa] shadow dark:bg-[#111] dark:border-zinc-800 p-2 px-4 w- justify-between rounded-full">
      <button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "system"
            ? "bg-white dark:bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => handleThemeChange("light")}  //set system to be light, because it looks cleaner
      >
        <Icons.monitor classes="" />
      </button>
      <button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "dark"
            ? "bg-white dark:bg-[#333] text-zinc-700 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => handleThemeChange("dark")}
      >
        <Icons.moon />
      </button>
      <button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "light"
            ? "bg-white dark:bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => handleThemeChange("light")}
      > 
        <Icons.sun />
      </button> 
    </div>
  );
}



