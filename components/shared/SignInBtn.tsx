"use client";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SignInBtn = ({ navbar, sheet }: { navbar: boolean; sheet: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useTheme();

  return (
    <div className={`${sheet ? "max-md:flex" : "max-md:hidden"} max-md:w-full`}>
      <Link
        href="/sign-in"
        className="flex h-[48px] w-[164px] items-center justify-center rounded-3xl bg-darkBlue text-center text-[15px] font-bold text-white transition-colors duration-300 ease-in-out hover:bg-lightBlue max-md:w-full"
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Sign In
      </Link>

      {isOpen && navbar && (
        <div
          onMouseOver={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`absolute right-[-7.5px] top-20 z-10 flex h-fit flex-col items-center gap-2 rounded-md p-5 shadow-lg ${mode === "dark" ? "bg-darkerGray text-white" : "bg-lightGray"}`}
        >
          <span className="flex items-center gap-2">
            New to{" "}
            {
              <>
                {mode === "dark" ? (
                  <Image
                    src="/logo-dark.svg"
                    alt="Kanban Logo"
                    width={75}
                    height={25}
                    className="inline"
                  />
                ) : (
                  <Image
                    src="/logo-light.svg"
                    alt="Kanban Logo"
                    width={75}
                    height={25}
                    className="inline"
                  />
                )}
              </>
            }
            ?
          </span>{" "}
          <Link href="/sign-up" className="text-sm font-bold underline">
            Create your account
          </Link>
          <small className="mt-2 flex items-center gap-1 text-xs">
            Secured by{" "}
            <Image
              src="/clerk-logo.png"
              width={50}
              height={25}
              alt="Clerk Logo"
              className="dark:invert"
            />
          </small>
        </div>
      )}
    </div>
  );
};

export default SignInBtn;
