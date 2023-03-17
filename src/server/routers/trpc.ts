import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  createBudgetController,
  getBudgetByTermController,
} from "../controllers/budget.controller";
import {
  getAllCoursesController,
  updateCourse,
} from "../controllers/course.controller";
import {
  createFinancialStatementController,
  getFinancialStatementByTermController,
} from "../controllers/financial-statement.controller";
import { createBudgetSchema, getBudgetSchema } from "../schemas/budget.schema";
import { updateCourseSchema } from "../schemas/course.schema";
import {
  createFinancialStatementSchema,
  getFinancialStatementSchema,
} from "../schemas/financial-statement.schema";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  createFinancialStatement: t.procedure
    .input(createFinancialStatementSchema)
    .mutation(({ input }) => createFinancialStatementController({ input })),
  getFinancialStatementByTerm: t.procedure
    .input(getFinancialStatementSchema)
    .query(({ input }) => getFinancialStatementByTermController({ input })),

  createBudget: t.procedure
    .input(createBudgetSchema)
    .mutation(({ input }) => createBudgetController({ input })),
  getBudgetByTerm: t.procedure
    .input(getBudgetSchema)
    .query(({ input }) => getBudgetByTermController({ input })),
  getAllCourses: t.procedure.query(() => getAllCoursesController()),
  updateCourse: t.procedure.input(updateCourseSchema).mutation(({ input }) => {
    updateCourse({ input });
  }),
});

export type AppRouter = typeof appRouter;
