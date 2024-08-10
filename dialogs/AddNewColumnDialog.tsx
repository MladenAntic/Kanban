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
import { NewColumnSchema } from "@/lib/validations";
import { addColumnToBoard } from "@/lib/actions/board.action";
import { usePathname } from "next/navigation";
import { AddNewColumnDialogProps } from "@/types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AddNewColumnDialog = ({
  isOpen,
  setIsOpen,
  boardId,
}: AddNewColumnDialogProps) => {
  const {toast} = useToast();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof NewColumnSchema>>({
    resolver: zodResolver(NewColumnSchema),
    defaultValues: {
      name: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof NewColumnSchema>) {
    try {
      setIsSubmitting(true);

      await addColumnToBoard(boardId, values.name, pathname);

      toast({
        title: "Column created successfully!",
      });
      
    } catch (error) {
      console.log("=> createNewColumn error", error);
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-almostBlack dark:text-white">
            Add New Column
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
                    <Input
                      placeholder="e.g. Web Design"
                      {...field}
                      className="dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex flex-col gap-3">
              <button
                type="submit"
                className="flex h-[40px] w-full items-center justify-center rounded-full bg-darkBlue font-bold text-white transition-opacity duration-200 hover:opacity-75 dark:bg-darkBlue dark:text-white"
              >
                {isSubmitting ? <div className="loader"></div> : "Save"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewColumnDialog;
