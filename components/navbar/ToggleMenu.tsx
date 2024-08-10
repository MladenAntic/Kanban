"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import SignInBtn from "../shared/SignInBtn";
import ThemeToggler from "../shared/ThemeToggler";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";

const ToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useTheme();

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="cursor-pointer text-2xl dark:text-white md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose size={24} />
        </button>
      ) : (
        <button
          type="button"
          className="cursor-pointer text-2xl dark:text-white md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu size={24} />
        </button>
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          className="top-[80px] flex flex-col items-center gap-8 bg-lightGray md:hidden"
          side="top"
        >
          <SignInBtn navbar={false} sheet={true} />
          <ThemeToggler sheet={true} />
          <div
            className={`flex h-fit flex-col items-center gap-2 rounded-md p-5 text-sm shadow-lg ${mode === "dark" ? "bg-darkerGray text-white" : "bg-white"}`}
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
              />
            </small>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ToggleMenu;
