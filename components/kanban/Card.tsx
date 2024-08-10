import { CardProps } from "@/types";
import React, { useState, useEffect } from "react";
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import ViewTaskDialog from "@/dialogs/ViewTaskDialog";

// eslint-disable-next-line no-redeclare
const Card: React.FC<CardProps> = ({
  title,
  description,
  subtasks,
  _id,
  status,
  handleDragStart,
  board,
  tasks
}) => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [checkedSubtasks, setCheckedSubtasks] = useState<string[]>([]);

  useEffect(() => {
    const savedCheckedSubtasks = JSON.parse(
      localStorage.getItem(`${_id}-checkedSubtasks`) || "[]"
    );
    setCheckedSubtasks(savedCheckedSubtasks);
  }, [_id]);

  const updateCheckedSubtasks = (updatedSubtasks: string[]) => {
    setCheckedSubtasks(updatedSubtasks);
    localStorage.setItem(
      `${_id}-checkedSubtasks`,
      JSON.stringify(updatedSubtasks)
    );
  };

  const subtaskCountText =
    (subtasks?.length === 1 && subtasks[0] === null) || subtasks?.length === 0
      ? ""
      : `${checkedSubtasks.length} of ${subtasks?.length} subtasks`;

  return (
    <>
      <DropIndicator beforeId={_id} status={status} />
      <motion.div
        layout
        layoutId={_id}
        draggable="true"
        onDragStart={(e: any) => handleDragStart(e, { title, _id, status })}
        className="group mb-3 w-[280px] cursor-pointer rounded-lg border bg-white p-3 shadow-md active:cursor-grabbing dark:border-darkGray dark:bg-darkerGray"
        onClick={() => setIsTaskOpen(true)}
      >
        <p className="text-[15px] font-bold text-almostBlack group-hover:text-darkBlue dark:text-white">
          {title}
        </p>
        <span className="text-xs font-bold text-mediumGray">
          {subtaskCountText}
        </span>
      </motion.div>

      <ViewTaskDialog
        id={_id}
        isOpen={isTaskOpen}
        setIsOpen={setIsTaskOpen}
        title={title}
        description={description}
        subtasks={subtasks}
        status={status}
        board={board}
        checkedSubtasks={checkedSubtasks}
        updateCheckedSubtasks={updateCheckedSubtasks}
        tasks={tasks}
      />
    </>
  );
};

export default Card;
