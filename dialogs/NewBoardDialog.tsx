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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { NewBoardDialogProps } from "@/types";

const NewBoardDialog = ({
  isOpen,
  setIsOpen,
  mongoUserId,
  pathname,
  boards,
}: NewBoardDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof NewBoardSchema>>({
    resolver: zodResolver(NewBoardSchema),
    defaultValues: {
      name: "",
      columns: ["Todo"],
    },
  });

  const [columns, setColumns] = useState<string[]>(["Todo"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddColumn = () => {
    if (columns.length < 7) {
      setColumns([...columns, ""]);
    } else {
      alert("You can have up to 7 columns.");
    }
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = columns.map((column, colIndex) =>
      colIndex === index ? value : column
    );
    setColumns(updatedColumns);
    form.setValue(`columns`, updatedColumns);
  };

  async function onSubmit(values: z.infer<typeof NewBoardSchema>) {
    try {
      setIsSubmitting(true);

      const isDuplicateName = boards?.some(
        (board) => board.name === values.name
      );

      if (isDuplicateName) {
        toast({
          title: "ERROR",
          description:
            "A board with this name already exists. Please choose a different name.",
          variant: "destructive",
        });

        return;
      }

      await createNewBoard({
        name: values.name,
        columns: values.columns.filter((column) => column !== ""),
        author: JSON.parse(JSON.stringify(mongoUserId)),
        path: pathname || "",
      });

      toast({
        title: "Board Created Successfully!",
      });

      router.push(`/dashboard/${values.name}`);
    } catch (error) {
      console.log("=> createNewBoard error", error);
    } finally {
      setIsSubmitting(false);
    }
  }

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
                <FormField
                  key={index}
                  control={form.control}
                  name={`columns.${index}`}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <FormControl className="flex items-center gap-2">
                          <Input
                            {...field}
                            value={column}
                            placeholder={`e.g. Todo ${index + 1}`}
                            onChange={(e) =>
                              handleColumnChange(index, e.target.value)
                            }
                            className="dark:text-white"
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
                      <FormMessage />
                    </div>
                  )}
                />
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
                disabled={isSubmitting}
                type="submit"
                className="flex h-[40px] w-full items-center justify-center rounded-full bg-darkBlue font-bold text-white transition-opacity duration-200 hover:opacity-75 dark:bg-darkBlue dark:text-white"
              >
                {isSubmitting ? (
                  <div className="loader"></div>
                ) : (
                  "+ Create New Board"
                )}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoardDialog;
