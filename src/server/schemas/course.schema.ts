import { z } from "zod";

export const courseSchema = z.object({
  subjectCode: z.string(),
  title: z.string(),
  cost: z.number(),
  credits: z.number(),
});

export const updateCourseSchema = z.object({
  data: z.object({
    financialStatementId: z.string(),
  }),
  courseId: z.string(),
});

export type UpdateCourseSchema = z.TypeOf<typeof updateCourseSchema>;
