import React, { useEffect } from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";

// ... (previous imports and code)

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("dark");
    }
  }, [setTheme]);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className={`flex border items-center p-2 px-4 w- justify-between rounded-full ${theme === 'dark' ? 'bg-[#111] shadow' : 'bg-[#fafafa] shadow-dark'}`}>
      <button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "system"
            ? "bg-white dark:bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => handleThemeChange("system")}
      >
        <Icons.monitor classes="" />
      </button>
      <button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "dark"
            ? "bg-white dark:bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => handleThemeChange("dark")}
      >
        <Icons.moon />
      </button>
      <button
        className={`mr-2 p-1 dark:text-zinc-500 text-zinc-700 ${
          theme === "light"
            ? "bg-[#333] text-zinc-50 rounded-full shadow-xl"
            : ""
        }`}
        onClick={() => handleThemeChange("light")}
      >
        <Icons.sun />
      </button>
    </div>
  );
}



