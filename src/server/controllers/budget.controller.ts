import { PrismaClient, Course, BudgetBar } from "@prisma/client";
import { CreateBudgetSchema } from "../schemas/budget.schema";

const prisma = new PrismaClient();

export const createBudgetController = async ({
  input,
}: {
  input: CreateBudgetSchema;
}) => {
  const budgetBars: BudgetBar[] = [];

  const budget = await prisma.budget.create({
    data: {
      term: input.term,
      budgetBars: { create: budgetBars },
    },
  });

  return {
    budget,
  };
};

export const getBudgetByTermController = async ({
  input,
}: {
  input: CreateBudgetSchema;
}) => {
  const budget = await prisma.budget.findFirst({
    where: { term: input.term },
    include: { budgetBars: true },
  });

  return {
    budget,
  };
};
