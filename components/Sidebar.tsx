"use client";

import Image from "next/image";
import Logo from "./shared/Logo";
import BoardName from "./sidebar/BoardName";
import ThemeToggler from "./shared/ThemeToggler";
import { FaRegEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { useTheme } from "@/context/ThemeProvider";
import NewBoardDialog from "@/dialogs/NewBoardDialog";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarProvider";
import { Board } from "@/types";
import { MdDashboardCustomize } from "react-icons/md";
import Link from "next/link";

const Sidebar = ({
  mongoUserId,
  boards,
}: {
  mongoUserId: string;
  boards?: Board[];
}) => {
  const { mode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { isSidebarClosed, setIsSidebarClosed } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${isSidebarClosed ? "-translate-x-full" : "translate-x-0"} z-[99] w-[325px] border-r ${mode === "light" ? "bg-white" : "border-darkGray bg-darkerGray"} py-10 pr-8 transition-transform duration-200 ease-in-out max-md:hidden`}
    >
      <div className="pl-8">
        <Logo />
      </div>

      <div className="mt-10 flex flex-col">
        <h5 className="pl-8 text-xs font-bold uppercase tracking-[2.4px] text-mediumGray">
          All Boards
        </h5>
        <div className="my-4 flex max-h-[400px] flex-col gap-1 overflow-y-auto scrollbar-hide">
          {boards?.map((board) => (
            <BoardName key={board.name} name={board.name} />
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-2 pl-8 transition-opacity duration-200 hover:opacity-75"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src="/board-icon-purple.svg"
            width={16}
            height={16}
            alt="Board Icon"
          />
          <span className="text-[15px] font-bold text-darkBlue">
            + Create New Board
          </span>
        </button>
        <Link
          href="/dashboard"
          className="mt-10 flex items-center gap-2 pl-8 transition-opacity duration-200 hover:opacity-75"
        >
          <span className="flex items-center gap-2 text-[15px] font-bold text-darkBlue">
            <MdDashboardCustomize /> Return to Dashboard
          </span>
        </Link>
      </div>

      <div
        className={`absolute bottom-[88px] left-[32px] flex h-[48px] w-[251px] items-center justify-center rounded-md ${mode === "light" ? "bg-lightGray" : "bg-darkGray"} py-4`}
      >
        <ThemeToggler />
      </div>
      <button
        type="button"
        className={`absolute bottom-[47px] left-[32px] flex items-center gap-2 ${isSidebarClosed ? "!left-[325px] size-[60px] justify-center rounded-r-full bg-darkBlue" : ""}`}
        onClick={() => setIsSidebarClosed(!isSidebarClosed)}
      >
        {isSidebarClosed ? (
          <RxEyeOpen
            className={`size-[18px] text-mediumGray ${isSidebarClosed ? "size-[32px] text-white" : ""}`}
          />
        ) : (
          <FaRegEyeSlash className="size-[18px] text-mediumGray" />
        )}
        <span
          className={`text-[15px] font-bold text-mediumGray ${isSidebarClosed ? "hidden" : "block"}`}
        >
          Hide Sidebar
        </span>
      </button>

      <NewBoardDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mongoUserId={mongoUserId}
        boards={boards}
      />
    </aside>
  );
};

export default Sidebar;
