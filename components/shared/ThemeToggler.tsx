"use client";

import {
  MdOutlineDarkMode,
  MdDarkMode,
  MdOutlineLightMode,
  MdLightMode,
} from "react-icons/md";
import { Switch } from "../ui/switch";
import { useTheme } from "@/context/ThemeProvider";
import { useState } from "react";

const ThemeToggler = ({sheet}: {sheet?: boolean}) => {
  const { mode, setMode } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`flex items-center gap-4 ${sheet ? "max-md:flex" : "max-md:hidden"}`}>
      {mode === "dark" ? (
        <MdOutlineLightMode className="text-white" size={24} />
      ) : (
        <MdLightMode size={24} />
      )}
      <Switch
        onCheckedChange={() => {
          setIsDarkMode(!isDarkMode);
          if (isDarkMode) {
            setMode("light");
            localStorage.theme = "light";
          } else {
            setMode("dark");
            localStorage.theme = "dark";
          }
        }}
        checked={mode === "dark"}
      />
      {mode === "dark" ? (
        <MdDarkMode className="text-white" size={24} />
      ) : (
        <MdOutlineDarkMode size={24} />
      )}
    </div>
  );
};

export default ThemeToggler;
