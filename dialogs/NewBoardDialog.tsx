"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewBoardSchema } from "@/lib/validations";

import { IoClose } from "react-icons/io5";
import { createNewBoard } from "@/lib/actions/board.action";
import { usePathname, useRouter } from "next/navigation";

const NewBoardDialog = ({
  isOpen,
  setIsOpen,
  mongoUserId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mongoUserId: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [columns, setColumns] = useState([" "]);

  const form = useForm<z.infer<typeof NewBoardSchema>>({
    resolver: zodResolver(NewBoardSchema),
    defaultValues: {
      name: "",
      columns: [" "],
    },
  });

  async function onSubmit(values: z.infer<typeof NewBoardSchema>) {
    try {
      await createNewBoard({
        name: values.name,
        columns: columns.filter((column) => column !== ""),
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      router.push(`/dashboard/${values.name}`);
    } catch (error) {
      console.log("=> createNewBoard error", error);
    }
  }

  const handleAddColumn = () => {
    if (columns.length < 7) {
      setColumns([...columns, ""]);
    } else {
      alert("You can have up to 7 columns.");
    }
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleColumnChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-almostBlack dark:text-white">
            Add New Board
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-mediumGray">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Web Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="text-xs font-bold text-mediumGray">
                Columns
              </FormLabel>
              {columns.map((column, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FormControl className="flex items-center gap-2">
                    <Input
                      value={column}
                      onChange={(e) =>
                        handleColumnChange(index, e.target.value)
                      }
                    />
                  </FormControl>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(index)}
                    >
                      <IoClose
                        className="font-bold text-mediumGray"
                        size={24}
                      />
                    </button>
                  )}
                </div>
              ))}
            </FormItem>
            <div className="mt-2 flex flex-col gap-3">
              <button
                type="button"
                className="h-[40px] w-full rounded-full bg-lightGray font-bold text-darkBlue transition-colors duration-200 hover:bg-darkGray hover:text-white dark:bg-lightGray dark:hover:bg-darkGray dark:hover:text-white"
                onClick={handleAddColumn}
              >
                + Add New Column
              </button>
              <button
                type="submit"
                className="h-[40px] w-full rounded-full bg-darkBlue font-bold text-white transition-opacity duration-200 hover:opacity-75 dark:bg-darkBlue dark:text-white"
              >
                + Create New Board
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoardDialog;
