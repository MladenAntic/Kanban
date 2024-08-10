"use client";

import { UserButton } from "@clerk/nextjs";
import { BsThreeDotsVertical } from "react-icons/bs";
import Logo from "./shared/Logo";
import { useTheme } from "@/context/ThemeProvider";
import { FaChevronDown, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarProvider";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditBoardDialog from "@/dialogs/EditBoardDialog";
import DeleteBoardDialog from "@/dialogs/DeleteBoardDialog";
import NewBoardDialog from "@/dialogs/NewBoardDialog";
import { Board, Task } from "@/types";
import AddNewTaskDialog from "@/dialogs/AddNewTaskDialog";
import MobileDropdown from "./shared/MobileDropdown";

const TopBar = ({
  boards = [],
  tasks = [],
  mongoUserId,
  mongoUserName,
}: {
  boards?: Board[];
  tasks?: Task[];
  mongoUserId: string;
  mongoUserName?: string;
}) => {
  const router = useRouter();
  const { mode } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState(false);
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const { isSidebarClosed } = useSidebar();

  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const decodedId = decodeURIComponent(id);

  const handleNewBoard = () => {
    setIsNewBoardOpen(true);
    setIsBoardDropdownOpen(false);
  };

  const handleEditBoard = async () => {
    setIsEditOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteBoard = async () => {
    setIsDeleteOpen(true);
    setIsDropdownOpen(false);
  };

  const handleClick = () => {
    router.back();
  };

  return (
    <div
      className={`topBarWidth absolute left-[325px] top-0 z-[99] flex h-[113px] items-center justify-between border-b px-8 ${isSidebarClosed ? "!left-0 !w-full" : ""} ${mode === "light" ? "bg-white" : "border-darkGray bg-darkerGray"} max-md:left-0 max-md:top-0 max-md:w-full`}
    >
      <div
        className={`relative ${isSidebarClosed ? "flex items-center gap-20" : ""}`}
      >
        {isSidebarClosed ? (
          <div className="max-md:hidden">
            <Logo />
            <div
              className={`absolute left-[192.5px] top-[-39px] h-[111px] w-px border ${mode === "light" ? "" : "border-darkGray"}`}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center gap-2">
          <div className="relative">
            <h3
              className={`font-bold ${mode === "light" ? "text-almostBlack" : "text-white"} max-sm:text-base md:text-base lg:text-2xl`}
            >
              {decodedId === "dashboard"
                ? `Welcome, ${mongoUserName}!`
                : decodedId}
            </h3>
            {decodedId === "dashboard" ? (
              <></>
            ) : (
              <button
                type="button"
                onClick={() => handleClick()}
                className="absolute left-0 top-[-25px] flex w-[100px] items-center gap-2 text-xs font-bold text-mediumGray hover:opacity-75"
              >
                <FaArrowLeft />
                Go back
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsBoardDropdownOpen(true)}
            className="md:hidden"
          >
            {isBoardDropdownOpen ? (
              <>
                <FaChevronDown className="rotate-180 text-lg text-mediumGray transition-transform duration-200" />
              </>
            ) : (
              <FaChevronDown className="rotate-0 text-lg text-mediumGray transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {decodedId === "dashboard" ? (
          <></>
        ) : (
          <>
            <button
              type="button"
              className="flex h-[48px] w-[164px] items-center justify-center gap-1 rounded-3xl bg-darkBlue text-[15px] font-bold text-white transition-colors duration-200 hover:bg-lightBlue disabled:cursor-not-allowed disabled:bg-lightBlue max-sm:h-[32px] max-sm:w-[48px] md:h-[32px] md:w-[48px] lg:h-[48px] lg:w-[164px]"
              onClick={() => setIsNewTaskOpen(true)}
            >
              +{" "}
              <span className="max-sm:hidden md:hidden lg:block">
                Add New Task
              </span>
            </button>
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger>
                <div className="flex items-center justify-center">
                  <BsThreeDotsVertical className="text-2xl text-mediumGray" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-16 mt-5 flex h-[90px] w-[192px] flex-col items-start justify-end gap-3 pb-3 pl-5">
                <button
                  type="button"
                  className="text-[13px] font-medium leading-[23px] text-mediumGray"
                  onClick={handleEditBoard}
                >
                  Edit Board
                </button>
                <button
                  type="button"
                  className="text-[13px] font-medium leading-[23px] text-errorDark"
                  onClick={handleDeleteBoard}
                >
                  Delete Board
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>

      <MobileDropdown
        boards={boards}
        isBoardDropdownOpen={isBoardDropdownOpen}
        setIsBoardDropdownOpen={setIsBoardDropdownOpen}
        handleNewBoard={handleNewBoard}
        mode={mode}
      />

      <NewBoardDialog
        isOpen={isNewBoardOpen}
        setIsOpen={setIsNewBoardOpen}
        mongoUserId={mongoUserId}
        pathname={pathname}
        boards={boards}
      />

      <EditBoardDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        boards={boards}
        pathname={pathname}
        decodedId={decodedId}
      />

      <DeleteBoardDialog
        isOpen={isDeleteOpen}
        boards={boards}
        setIsDeleteOpen={setIsDeleteOpen}
        pathname={pathname}
        decodedId={decodedId}
      />

      <AddNewTaskDialog
        tasks={tasks}
        pathname={pathname}
        isOpen={isNewTaskOpen}
        setIsOpen={setIsNewTaskOpen}
        selectOptions={
          boards.filter((board) => board.name === decodedId)[0]?.columns || []
        }
        mongoUserId={mongoUserId}
        boardId={boards.filter((board) => board.name === decodedId)[0]?._id}
      />
    </div>
  );
};

export default TopBar;
