"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import EditTaskDialog from "./EditTaskDialog";
import { ViewTaskDialogProps } from "@/types";
import DeleteTaskDialog from "./DeleteTaskDialog";

const ViewTaskDialog = ({
  id,
  isOpen,
  setIsOpen,
  title,
  description,
  subtasks,
  status,
  board,
  checkedSubtasks,
  updateCheckedSubtasks,
  tasks
}: ViewTaskDialogProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditTask = async () => {
    setIsOpen(false);
    setIsEditOpen(true);
  };

  const handleDeleteTask = async () => {
    setIsOpen(false);
    setIsDeleteOpen(true);
  };

  const toggleSubtask = (subtask: string) => {
    const updatedSubtasks = checkedSubtasks.includes(subtask)
      ? checkedSubtasks.filter((st) => st !== subtask)
      : [...checkedSubtasks, subtask];
    updateCheckedSubtasks(updatedSubtasks);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-md bg-white">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-bold text-almostBlack dark:text-white">
              {title}
            </DialogTitle>
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
                  onClick={handleEditTask}
                >
                  Edit Task
                </button>
                <button
                  type="button"
                  className="text-[13px] font-medium leading-[23px] text-errorDark"
                  onClick={handleDeleteTask}
                >
                  Delete Task
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogHeader>
          <DialogDescription className="text-sm leading-[23px] text-mediumGray dark:text-lightGray">
            {description}
          </DialogDescription>
          <div className="flex flex-col gap-2">
            {(subtasks?.length === 1 && subtasks[0] === null) ||
            subtasks?.length === 0 ? (
              ""
            ) : (
              <>
                <label className="text-sm font-bold text-mediumGray">
                  Subtasks
                </label>
                {subtasks?.map((subtask) => (
                  <div
                    key={subtask}
                    className="flex items-center space-x-2 bg-lightGray p-3 dark:bg-darkGray"
                  >
                    <Checkbox
                      checked={checkedSubtasks.includes(subtask)}
                      onCheckedChange={() => toggleSubtask(subtask)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <p
                        className={`text-sm font-bold text-almostBlack dark:text-lightGray ${
                          checkedSubtasks.includes(subtask)
                            ? "!text-mediumGray line-through"
                            : "text-almostBlack"
                        }`}
                      >
                        {subtask}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            <label className="text-sm font-bold text-mediumGray">
              Current Status
            </label>
            <p className="mt-2 flex h-[40px] w-full items-center border pl-4 text-sm dark:text-lightGray">
              {status}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <EditTaskDialog
        id={id}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        selectOptions={board?.columns || []}
        title={title}
        description={description}
        subtasks={subtasks}
        status={status}
        boardId={board?._id || ""}
        tasks={tasks}
      />

      <DeleteTaskDialog
        isOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        title={title}
        id={id}
        boardId={board?._id || ""}
      />
    </>
  );
};

export default ViewTaskDialog;
