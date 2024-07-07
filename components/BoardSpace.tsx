/* eslint-disable no-self-compare */
"use client";

import { useSidebar } from "@/context/SidebarProvider";
import NewBoardDialog from "@/dialogs/NewBoardDialog";
import { Board } from "@/types";
import { useState } from "react";

const BoardSpace = ({
  mongoUserId,
  boards,
}: {
  mongoUserId: string;
  boards?: Board[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSidebarClosed } = useSidebar();

  return (
    <>
      <div
        className={`boardSpaceHeight topBarWidth absolute left-[325px] top-[113px] grid place-content-center place-items-center ${isSidebarClosed ? "!left-0 !w-full" : ""} bg-lightGray dark:bg-darkGray max-md:left-0 max-md:top-0 max-md:h-screen max-md:w-full`}
      >
        <div className="flex flex-col items-center justify-center gap-7 text-center max-sm:mx-auto max-sm:w-4/5 md:mx-auto md:w-4/5 lg:w-full">
          <h3 className="text-lg font-bold text-mediumGray lg:mx-auto lg:w-[750px]">
            {boards?.length ?? 0 > 0
              ? `Welcome back! You have created ${boards?.length} boards so far. You're doing great! You can add as many more as you like. Just click the below button to add a new one.`
              : "Looks like you don't have any boards yet! Click below to create your first board."}
          </h3>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="h-[48px] w-[174px] rounded-3xl bg-darkBlue text-[15px] font-bold text-white transition-colors duration-200 hover:bg-lightBlue"
          >
            + Add New Board
          </button>
        </div>
      </div>

      <NewBoardDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mongoUserId={mongoUserId}
      />
    </>
  );
};

export default BoardSpace;
