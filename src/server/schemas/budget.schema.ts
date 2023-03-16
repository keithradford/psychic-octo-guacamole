import { z } from "zod";
import { budgetBarSchema } from "./budget-bars.schema";

export const createBudgetSchema = z.object({
  term: z.string(),
});

export const getBudgetSchema = z.object({
  term: z.string(),
});

export const budgetSchema = z.object({
  term: z.string(),
  budgetBars: z.array(budgetBarSchema),
});

export type CreateBudgetSchema = z.TypeOf<typeof createBudgetSchema>;
