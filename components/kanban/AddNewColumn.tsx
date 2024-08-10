import AddNewColumnDialog from "@/dialogs/AddNewColumnDialog";
import { useState } from "react";

const AddNewColumn = ({boardId}: {boardId: string}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="newColumnBgLight mt-10 grid w-[280px] shrink-0 cursor-pointer place-content-center rounded-md text-2xl font-bold text-mediumGray hover:text-darkBlue dark:bg-darkerGray dark:bg-none"
      >
        <span>+ New Column</span>
      </div>

      <AddNewColumnDialog isOpen={isOpen} setIsOpen={setIsOpen} boardId={boardId} />
    </>
  );
};

export default AddNewColumn;
