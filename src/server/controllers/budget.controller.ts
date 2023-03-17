import { PrismaClient, Course, BudgetBar } from "@prisma/client";
import {
  AddBudgetBarToBudgetSchema,
  CreateBudgetSchema,
  UpdateBudgetBarSchema,
} from "../schemas/budget.schema";

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

export const addBudgetBarToBudgetController = async ({
  input,
}: {
  input: AddBudgetBarToBudgetSchema;
}) => {
  await prisma.budgetBar.create({
    data: {
      title: input.title,
      max: input.max,
      currentVal: input.current,
      isIncome: input.isIncome,
      Budget: { connect: { id: input.budgetId } },
    },
  });

  const budget = await prisma.budget.findFirst({
    where: { id: input.budgetId },
    include: { budgetBars: true },
  });

  return {
    budget,
  };
};

export const updateBudgetBarController = async ({
  input,
}: {
  input: UpdateBudgetBarSchema;
}) => {
  await prisma.budgetBar.update({
    where: {
      id: input.budgetBarId,
    },
    data: {
      title: input.title,
      max: input.max,
      currentVal: input.current,
    },
  });

  const budget = await prisma.budget.findFirst({
    where: { id: input.budgetId },
    include: { budgetBars: true },
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
