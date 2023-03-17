import { Course, PrismaClient } from "@prisma/client";
import { CreateFinancialStatementSchema } from "../schemas/financial-statement.schema";

const prisma = new PrismaClient();

export const createFinancialStatementController = async ({
  input,
}: {
  input: CreateFinancialStatementSchema;
}) => {
  const courses: Course[] = [];

  const financialStatement = await prisma.financialStatemetn.create({
    data: {
      term: input.term,
      paid: false,
      courses: { create: courses },
    },
  });

  return {
    financialStatement,
  };
};

export const getFinancialStatementByTermController = async ({
  input,
}: {
  input: CreateFinancialStatementSchema;
}) => {
  const financialStatement = await prisma.financialStatemetn.findFirst({
    where: {
      term: input.term,
    },
    include: {
      courses: true,
    },
  });

  return {
    financialStatement,
  };
};
