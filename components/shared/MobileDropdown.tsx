import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { MdDashboardCustomize } from "react-icons/md";
import { MobileDropdownProps } from "@/types";
import BoardName from "../sidebar/BoardName";
import ThemeToggler from "./ThemeToggler";

const MobileDropdown = ({
  boards,
  isBoardDropdownOpen,
  setIsBoardDropdownOpen,
  handleNewBoard,
  mode,
}: MobileDropdownProps) => {
  return (
    <Dialog open={isBoardDropdownOpen} onOpenChange={setIsBoardDropdownOpen}>
      <DialogContent className="absolute top-[400px] w-4/5 md:hidden">
        <div className="flex flex-col">
          <h5 className="pl-8 text-xs font-bold uppercase tracking-[2.4px] text-mediumGray">
            All Boards
          </h5>
          <div className="my-4 max-h-[300px] overflow-y-auto scrollbar-hide">
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
          <Link
            href="/dashboard"
            className="mt-10 flex items-center gap-2 pl-8 transition-opacity duration-200 hover:opacity-75"
          >
            <span className="flex items-center gap-2 text-[15px] font-bold text-darkBlue">
              <MdDashboardCustomize /> Return to Dashboard
            </span>
          </Link>
          <div
            className={`mt-6 flex h-[48px] w-full items-center justify-center rounded-md ${mode === "light" ? "bg-lightGray" : "bg-darkGray"} py-4`}
          >
            <ThemeToggler sheet={true} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileDropdown;
