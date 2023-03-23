import { Course, PrismaClient } from "@prisma/client";
import {
  AddCourseToFinancialStatementSchema,
  CreateFinancialStatementSchema,
} from "../schemas/financial-statement.schema";

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

export const addCourseToFinancialStatementController = async ({
  input,
}: {
  input: AddCourseToFinancialStatementSchema;
}) => {
  const financialStatement = await prisma.financialStatemetn.update({
    where: {
      id: input.financialStatementId,
    },
    data: {
      courses: { connect: { id: input.courseId } },
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

export const getAllFinancialStatementsController = async () => {
  const financialStatements = await prisma.financialStatemetn.findMany({
    include: {
      courses: true,
    },
  });

  return {
    financialStatements,
  };
};
