"use client";

import { useSidebar } from "@/context/SidebarProvider";
import { Board, Task } from "@/types";
import React from "react";
import BoardArea from "./BoardArea";
import { usePathname } from "next/navigation";

const CustomKanban: React.FC<{ boards?: Board[]; tasks?: Task[] }> = ({
  boards = [] as Board[],
  tasks = [] as Task[],
}) => {
  const { isSidebarClosed } = useSidebar();

  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const decodedId = decodeURIComponent(id);

  const currentBoard = boards.find((board) => board.name === decodedId);
  const boardTasks = tasks.filter((task) => task.board === currentBoard?._id);

  return (
    <div
      className={`boardSpaceHeight topBarWidth absolute left-[325px] top-[113px] ${isSidebarClosed ? "!left-0 !w-full" : ""} overflow-x-auto whitespace-nowrap bg-lightGray dark:bg-darkGray max-md:left-0 max-md:h-screen max-md:w-full`}
    >
      <div className="inline-block h-full">
        <BoardArea boards={boards} tasks={boardTasks} decodedId={decodedId} />
      </div>
    </div>
  );
};

export default CustomKanban;
