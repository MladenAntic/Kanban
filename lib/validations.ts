import { z } from "zod";

export const NewBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(25, {
      message: "Maximum of 25 characters.",
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
