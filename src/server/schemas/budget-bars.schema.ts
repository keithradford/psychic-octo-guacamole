import { z } from "zod";

export const createBudgetBarSchema = z.object({
  title: z.string(),
  max: z.number(),
  isIncome: z.boolean(),
});

export const budgetBarSchema = z.object({
  id: z.string(),
  title: z.string(),
  max: z.number(),
  isIncome: z.boolean(),
});

export type CreateBudgetBarSchema = z.TypeOf<typeof createBudgetBarSchema>;
