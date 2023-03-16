import { z } from "zod";

export const courseSchema = z.object({
  subjectCode: z.string(),
  title: z.string(),
  cost: z.number(),
  credits: z.number(),
});
