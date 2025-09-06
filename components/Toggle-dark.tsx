"use client";

import { useEffect, useState } from "react";

export default function ToggleDark() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="absolute bg-white top-2 right-2 w-12 border-solid border-1 border-slate-800 rounded-2xl"
      >
        <img
          src={isDark ? "/dark.png" : "/light.png"}
          width={24}
          alt="light"
          className="dark:translate-x-0 transition-transform duration-300 translate-x-5 "
        />
      </button>
    </div>
  );
}
