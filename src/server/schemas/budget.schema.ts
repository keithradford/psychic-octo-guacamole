import { z } from "zod";
import { budgetBarSchema } from "./budget-bars.schema";

export const createBudgetSchema = z.object({
  term: z.string(),
});

export const addBudgetBarToBudgetSchema = z.object({
  budgetId: z.string(),
  title: z.string(),
  max: z.number(),
  current: z.number(),
  isIncome: z.boolean(),
});

export const updateBudgetBarSchema = z.object({
  budgetId: z.string(),
  budgetBarId: z.string(),
  title: z.string(),
  max: z.number(),
  current: z.number(),
});

export const getBudgetSchema = z.object({
  term: z.string(),
});

export const budgetSchema = z.object({
  term: z.string(),
  budgetBars: z.array(budgetBarSchema),
});

export type CreateBudgetSchema = z.TypeOf<typeof createBudgetSchema>;
export type AddBudgetBarToBudgetSchema = z.TypeOf<
  typeof addBudgetBarToBudgetSchema
>;
export type UpdateBudgetBarSchema = z.TypeOf<typeof updateBudgetBarSchema>;
