/* eslint-disable no-self-compare */
"use client";

import { useSidebar } from "@/context/SidebarProvider";
import NewBoardDialog from "@/dialogs/NewBoardDialog";
import { Board } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { CardContainer } from "./ui/3d-card-effect";

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
        className={`boardSpaceHeight topBarWidth absolute left-[325px] top-[113px] grid ${isSidebarClosed ? "!left-0 !w-full" : ""} bg-lightGray dark:bg-darkGray max-md:left-0 max-md:top-0 max-md:h-screen max-md:w-full ${boards?.length === 0 ? "place-content-center place-items-center" : "place-content-start place-items-start"}`}
      >
        {boards?.length ?? 0 > 0 ? (
          <div className="flex flex-wrap gap-2 bg-lightGray p-7 dark:bg-darkGray max-md:mt-[150px] max-md:items-center max-md:justify-center">
            {boards?.map((board) => (
              <CardContainer key={board._id}>
                <div className="flex size-[300px] flex-col justify-evenly rounded-lg bg-white p-6 shadow-xl dark:bg-darkerGray">
                  <h3 className="mb-7 text-2xl font-bold uppercase text-almostBlack dark:text-white">
                    {board.name}
                  </h3>
                  <div>
                    <p className="mb-1 text-[15px] font-semibold text-almostBlack dark:text-white">
                      Columns: {board.columns?.length}
                    </p>
                    <p className="text-[15px] font-semibold text-almostBlack dark:text-white">
                      Tasks: {board.tasks?.length}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/${board.name}`}
                    className="flex h-[48px] w-[174px] items-center justify-center gap-2 rounded-3xl bg-darkBlue text-center text-[15px] font-bold text-white transition-colors duration-200 hover:bg-lightBlue"
                  >
                    Visit Board <FaArrowRight />
                  </Link>
                </div>
              </CardContainer>
            ))}
            <div className="flex size-[300px] flex-col items-center justify-center gap-4 border-2 border-dashed">
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="size-[50px] rounded-full bg-darkBlue text-2xl font-bold text-white transition-colors duration-200 hover:bg-lightBlue"
              >
                +
              </button>
              <span className="font-bold text-mediumGray">Add New Board</span>
            </div>
          </div>
        ) : (
          <div
            className={`boardSpaceHeight flex flex-col items-center justify-center gap-7 text-center max-md:mx-auto max-md:w-4/5 md:mx-auto md:w-4/5 lg:w-[calc(100vw-325px)] ${isSidebarClosed ? "!w-screen" : ""}`}
          >
            <h3 className="text-lg font-bold text-mediumGray lg:mx-auto lg:w-[750px]">
              Looks like you don&apos;t have any boards yet! Click below to
              create your first board.
            </h3>
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="h-[48px] w-[174px] rounded-3xl bg-darkBlue text-[15px] font-bold text-white transition-colors duration-200 hover:bg-lightBlue"
            >
              + Add New Board
            </button>
          </div>
        )}
      </div>

      <NewBoardDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mongoUserId={mongoUserId}
        boards={boards}
      />
    </>
  );
};

export default BoardSpace;
