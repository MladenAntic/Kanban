import { Board, BoardAreaProps, Task } from "@/types";
import React, { useState } from "react";
import Column from "./Column";
import AddNewColumn from "./AddNewColumn";

const BoardArea: React.FC<BoardAreaProps> = ({
  boards = [] as Board[],
  tasks = [] as Task[],
  decodedId,
}) => {
  const [cards, setCards] = useState<Task[]>(tasks);

  const currentBoard = boards.find((board) => board.name === decodedId);

  return (
    <div className="flex size-full gap-3 overflow-scroll p-12 scrollbar-hide">
      {currentBoard?.columns?.map((column) => (
        <Column
          key={column}
          title={column}
          status={column}
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
          board={currentBoard}
          tasks={tasks}
        />
      ))}
      <AddNewColumn boardId={currentBoard?._id || ""} />
    </div>
  );
};

export default BoardArea;
