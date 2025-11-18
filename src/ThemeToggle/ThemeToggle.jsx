import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  // Detect system preference on first load
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    // If user explicitly saved a theme, honor it.
    if (savedTheme === "dark") return true; // isDark = true when saved as dark
    if (savedTheme === "light") return false; // isDark = false when saved as light
    // No saved preference: default to light (isDark = false), but if system prefers dark, use dark.
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }
    return false;
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setIsDark(media.matches);
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <label
      aria-label="Toggle Theme"
      className="ml-4 p-2 rounded-full border transition-colors 
             cursor-pointer swap swap-rotate"
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="theme-controller hidden"
      />

      {/* ☀️ Sun icon (for Light mode) */}
      <svg
        className="swap-off h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1.5m0 15V21m8.485-8.485h-1.5m-15 
         0H3m15.364-6.364l-1.06 1.06m-12.728 
         0l-1.06-1.06m12.728 12.728l-1.06-1.06m-12.728 
         0l-1.06 1.06M12 7.5A4.5 4.5 0 1 1 7.5 
         12 4.5 4.5 0 0 1 12 7.5z"
        />
      </svg>

      {/* 🌙 Moon icon (for Dark mode) */}
      <svg
        className="swap-on h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0 1 
         12 21.75c-5.385 0-9.75-4.365-9.75-9.75 
         0-4.136 2.664-7.64 6.438-9.093a.75.75 
         0 0 1 .908.37.75.75 0 0 1-.082.789A7.501 
         7.501 0 0 0 12 19.5a7.48 7.48 0 0 0 
         6.184-3.393.75.75 0 0 1 .788-.282.75.75 
         0 0 1 .38.907z"
        />
      </svg>
    </label>
  );
};

export default ThemeToggle;
