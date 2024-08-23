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
import { IoClose } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewTaskSchema } from "@/lib/validations";
import { createNewTask } from "@/lib/actions/task.action";
import { useToast } from "@/components/ui/use-toast";
import { AddNewTaskDialogProps } from "@/types";

const AddNewTaskDialog = ({
  tasks,
  pathname,
  isOpen,
  setIsOpen,
  selectOptions,
  mongoUserId,
  boardId,
}: AddNewTaskDialogProps) => {
  const boardTasks = tasks?.filter((task) => task.board === boardId);
  const { toast } = useToast();

  const schema = NewTaskSchema(selectOptions);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      subtasks: [],
      select: "",
    },
  });

  const [subtasks, setSubtasks] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubtask = () => {
    if (subtasks.length < 7) {
      setSubtasks([...subtasks, ""]);
    } else {
      alert("You can have up to 7 subtasks.");
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, subtaskIndex) => subtaskIndex !== index));
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = subtasks.map((subtask, subtaskIndex) =>
      subtaskIndex === index ? value : subtask
    );
    setSubtasks(updatedSubtasks);
    form.setValue(`subtasks`, updatedSubtasks);
  };

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setIsSubmitting(true);

      const isDuplicateName = boardTasks?.some(
        (task) => task.title === values.title
      );

      if (isDuplicateName) {
        toast({
          title: "ERROR",
          description:
            "A task with this name already exists. Please choose a different name.",
          variant: "destructive",
        });

        return;
      }

      const filteredSubtasks =
        values.subtasks?.filter(
          (subtask): subtask is string => subtask !== ""
        ) || [];

      await createNewTask({
        title: values.title ?? "",
        description: values.description,
        subtasks: filteredSubtasks,
        status: values.select,
        author: JSON.parse(JSON.stringify(mongoUserId)),
        board: boardId,
        path: pathname,
      });

      toast({
        title: "Task Created Successfully!",
      });

      setIsOpen(false);

      window.location.reload();
    } catch (error) {
      console.log("=> createNewTask error", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-almostBlack dark:text-white">
            Add New Task
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-mediumGray">
                    Title
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-mediumGray">
                    Description (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                      {...field}
                      className="dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="text-xs font-bold text-mediumGray">
                Subtasks (optional)
              </FormLabel>
              {subtasks.map((subtask, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`subtasks.${index}`}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <FormControl className="flex items-center gap-2">
                          <Input
                            {...field}
                            value={subtask}
                            placeholder={`e.g. Make Coffee ${index + 1}`}
                            onChange={(e) =>
                              handleSubtaskChange(index, e.target.value)
                            }
                            className="dark:text-white"
                          />
                        </FormControl>
                        {index > -1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSubtask(index)}
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
                onClick={handleAddSubtask}
              >
                + Add New Subtask
              </button>
              <FormField
                control={form.control}
                name="select"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-mediumGray">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue=""
                    >
                      <SelectTrigger className="my-3 w-full" {...field}>
                        <SelectValue
                          placeholder="Column"
                          className="placeholder:text-mediumGray"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {selectOptions.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="dark:text-white"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex h-[40px] w-full items-center justify-center rounded-full bg-darkBlue font-bold text-white transition-opacity duration-200 hover:opacity-75 dark:bg-darkBlue dark:text-white"
              >
                {isSubmitting ? <div className="loader"></div> : "Create Task"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskDialog;
