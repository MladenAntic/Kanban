"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { deleteBoard } from "@/lib/actions/board.action";
import { Board } from "@/types";

const DeleteBoardDialog = ({
  isOpen,
  setIsDeleteOpen,
  boards,
}: {
  isOpen: boolean;
  setIsDeleteOpen: (value: boolean) => void;
  boards: Board[];
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  const decodedId = decodeURIComponent(id);

  const deleteCurrentBoard = async () => {
    await deleteBoard({ name: decodedId, path: pathname });

    toast({
      title: "Board Successfully Deleted!",
    });

    router.push("/dashboard");
  };

  const keepCurrentBoard = () => {
    setIsDeleteOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsDeleteOpen}>
      <DialogContent className="rounded-md bg-white">
        <DialogHeader>
          <DialogTitle className="mb-4 text-lg font-bold text-errorDark">
            Delete this board?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the &#x2018;{" "}
            {`${boards?.filter((board) => board?.name === decodedId)[0]?.name}`}{" "}
            &#x2019; board? This action will remove all columns and tasks and
            cannot be reversed.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={deleteCurrentBoard}
            type="button"
            className="flex-1 rounded-[20px] bg-errorDark py-2 text-[13px] font-bold leading-[23px] text-white transition-opacity duration-200 hover:opacity-60"
          >
            Delete
          </button>
          <button
            onClick={keepCurrentBoard}
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

export default DeleteBoardDialog;
