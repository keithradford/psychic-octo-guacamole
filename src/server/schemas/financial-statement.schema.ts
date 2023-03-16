import { z } from "zod";
import { courseSchema } from "./course.schema";

export const createFinancialStatementSchema = z.object({
  term: z.string(),
});

export const getFinancialStatementSchema = z.object({
  term: z.string(),
});

export const financialStatementSchema = z.object({
  term: z.string(),
  courses: z.array(courseSchema),
  paid: z.boolean(),
});

export type CreateFinancialStatementSchema = z.TypeOf<
  typeof createFinancialStatementSchema
>;
