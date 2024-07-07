"use client"

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import React from "react";

const Logo = () => {
  const { mode } = useTheme();

  return (
    <>
      {mode === "dark" ? (
        <Image src="/logo-dark.svg" alt="Kanban Logo" width={152.528} height={25.224} />
      ) : (
        <Image src="/logo-light.svg" alt="Kanban Logo" width={152.228} height={25.224} />
      )}
    </>
  );
};

export default Logo;
