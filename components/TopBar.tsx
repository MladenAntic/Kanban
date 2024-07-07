"use client";

import { UserButton } from "@clerk/nextjs";
import { BsThreeDotsVertical } from "react-icons/bs";
import Logo from "./shared/Logo";
import { useTheme } from "@/context/ThemeProvider";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import BoardName from "./sidebar/BoardName";
import ThemeToggler from "./shared/ThemeToggler";
import { useSidebar } from "@/context/SidebarProvider";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditBoardDialog from "@/dialogs/EditBoardDialog";
import DeleteBoardDialog from "@/dialogs/DeleteBoardDialog";
import NewBoardDialog from "@/dialogs/NewBoardDialog";
import { Board } from "@/types";

const TopBar = ({
  boards = [],
  mongoUserId,
}: {
  boards?: Board[];
  mongoUserId: string;
}) => {
  const { mode } = useTheme();
  const [isBoardDropdownOpen, setIsBoardDropdownOpen] = useState(false);
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { isSidebarClosed } = useSidebar();

  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const decodedId = decodeURIComponent(id);

  const handleNewBoard = () => {
    setIsNewBoardOpen(true);
  };

  const handleEditBoard = async () => {
    setIsEditOpen(true);
  };

  const handleDeleteBoard = async () => {
    setIsDeleteOpen(true);
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
          <h3
            className={`font-bold ${mode === "light" ? "text-almostBlack" : "text-white"} max-sm:text-base md:text-base lg:text-2xl`}
          >
            {decodedId === "dashboard" ? "" : decodedId}
          </h3>
          <button
            type="button"
            onClick={() => setIsBoardDropdownOpen(true)}
            className="md:hidden"
          >
            {isBoardDropdownOpen ? (
              <>
                <FaChevronDown className="rotate-180 text-lg text-mediumGray transition-transform duration-200" />
                <Dialog
                  open={isBoardDropdownOpen}
                  onOpenChange={setIsBoardDropdownOpen}
                >
                  <DialogContent className="absolute top-[260px] w-4/5 md:hidden">
                    <div className="flex flex-col">
                      <h5 className="pl-8 text-xs font-bold uppercase tracking-[2.4px] text-mediumGray">
                        All Boards
                      </h5>
                      <div className="my-4">
                        {boards?.map((board, index) => (
                          <BoardName key={index} name={board.name} />
                        ))}
                      </div>
                      <button
                        onClick={handleNewBoard}
                        type="button"
                        className="flex items-center gap-2 pl-8 transition-opacity duration-200 hover:opacity-75"
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
                      <div
                        className={`mt-6 flex h-[48px] w-full items-center justify-center rounded-md ${mode === "light" ? "bg-lightGray" : "bg-darkGray"} py-4`}
                      >
                        <ThemeToggler sheet={true} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
            >
              +{" "}
              <span className="max-sm:hidden md:hidden lg:block">
                Add New Task
              </span>
            </button>
            <DropdownMenu>
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
        <UserButton />
      </div>

      <NewBoardDialog
        isOpen={isNewBoardOpen}
        setIsOpen={setIsNewBoardOpen}
        mongoUserId={mongoUserId}
      />

      <EditBoardDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        mongoUserId={mongoUserId}
        boards={boards}
      />

      <DeleteBoardDialog
        isOpen={isDeleteOpen}
        boards={boards}
        setIsDeleteOpen={setIsDeleteOpen}
      />
    </div>
  );
};

export default TopBar;
