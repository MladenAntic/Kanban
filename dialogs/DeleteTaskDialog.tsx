"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteTask } from "@/lib/actions/task.action";
import { DeleteTaskDialogProps } from "@/types";
import { usePathname } from "next/navigation";
import { useState } from "react";

const DeleteTaskDialog = ({
  isOpen,
  setIsDeleteOpen,
  title,
  id,
  boardId,
}: DeleteTaskDialogProps) => {
  const { toast } = useToast();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteCurrentTask = async () => {
    try {
      setIsSubmitting(true);

      await deleteTask({
        taskId: id || [],
        path: pathname,
        board: boardId,
      });

      toast({
        title: "Task Successfully Deleted!",
      });

      window.location.reload();
    } catch (error) {
      console.log("Error deleting task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const keepCurrentTask = () => {
    setIsDeleteOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsDeleteOpen}>
      <DialogContent className="rounded-md bg-white">
        <DialogHeader>
          <DialogTitle className="mb-4 text-lg font-bold text-errorDark">
            Delete this task?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the &#x2018; {title} &#x2019; and
            it&apos;s subtasks? This action cannot be reversed.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={deleteCurrentTask}
            type="button"
            className="flex flex-1 items-center justify-center rounded-[20px] bg-errorDark py-2 text-[13px] font-bold leading-[23px] text-white transition-opacity duration-200 hover:opacity-60"
          >
            {isSubmitting ? <div className="loader"></div> : "Delete"}
          </button>
          <button
            onClick={keepCurrentTask}
            type="button"
            className="flex-1 rounded-[20px] bg-[#f0effa] py-2 text-[13px] font-bold leading-[23px] text-darkBlue"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskDialog;
