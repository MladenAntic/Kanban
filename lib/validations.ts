import { z } from "zod";

export const NewBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Maximum of 50 characters.",
    }),
  columns: z.array(
    z
      .string()
      .trim()
      .min(2, {
        message: "Column name must be at least 2 characters.",
      })
      .max(25, {
        message: "Maximum of 25 characters.",
      })
  ),
});

export const NewTaskSchema = (options: string[]) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(2, {
        message: "Task name must be at least 2 characters.",
      })
      .max(50, {
        message: "Maximum of 25 characters.",
      }),
    subtasks: z.array(
      z
        .string()
        .trim()
        .max(75, {
          message: "Maximum of 75 characters.",
        })
        .optional()
    ),
    description: z
      .string()
      .trim()
      .max(150, {
        message: "Maximum of 150 characters.",
      })
      .optional(),
    select: z.string().refine((val) => options.includes(val), {
      message: "Status is required",
    }),
  });

export const NewColumnSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Column name must be at least 2 characters.",
    })
    .max(25, {
      message: "Maximum of 25 characters.",
    }),
});
