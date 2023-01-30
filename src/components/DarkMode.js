import { useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useCookies } from 'react-cookie';

export const RenderThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [ cookie, setCookie, removeCookie] = useCookies(['cookie-name']);

  useEffect(() => {
    if (currentTheme)
     setCookie("theme", currentTheme);
  }, [currentTheme]);

  if (currentTheme === "dark") {
    setCookie("theme", currentTheme);
    return (
      <div
        onClick={() => setTheme("light")}
        className="flex flex-row align-middle justify-center items-center"
      >
        <SunIcon className="w-10 h-10 text-gray-300 " role="button" />
        <h1 className="pl-2 text-gray-300">Light Mode</h1>
      </div>
    );
  } else {
    setCookie("theme", currentTheme);
    return (
      <div
        onClick={() => setTheme("dark")}
        className="flex flex-row align-middle justify-center items-center"
      >
        <MoonIcon className="w-10 h-10 text-gray-300" role="button" />
        <h1 className="pl-2 text-gray-300">Dark Mode</h1>
      </div>
    );
  }
};
