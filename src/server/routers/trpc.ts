import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  addBudgetBarToBudgetController,
  createBudgetController,
  getBudgetByTermController,
  updateBudgetBarController,
} from "../controllers/budget.controller";
import {
  getAllCoursesController,
  updateCourse,
} from "../controllers/course.controller";
import {
  addCourseToFinancialStatementController,
  createFinancialStatementController,
  getAllFinancialStatementsController,
  getFinancialStatementByTermController,
} from "../controllers/financial-statement.controller";
import {
  addBudgetBarToBudgetSchema,
  createBudgetSchema,
  getBudgetSchema,
  updateBudgetBarSchema,
} from "../schemas/budget.schema";
import { updateCourseSchema } from "../schemas/course.schema";
import {
  addCourseToFinancialStatementSchema,
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
  addCourseToFinancialStatement: t.procedure
    .input(addCourseToFinancialStatementSchema)
    .mutation(({ input }) =>
      addCourseToFinancialStatementController({ input })
    ),
  getFinancialStatementByTerm: t.procedure
    .input(getFinancialStatementSchema)
    .query(({ input }) => getFinancialStatementByTermController({ input })),
  getAllFinancialStatements: t.procedure.query(() =>
    getAllFinancialStatementsController()
  ),

  createBudget: t.procedure
    .input(createBudgetSchema)
    .mutation(({ input }) => createBudgetController({ input })),
  addBudgetBarToBudget: t.procedure
    .input(addBudgetBarToBudgetSchema)
    .mutation(({ input }) => addBudgetBarToBudgetController({ input })),
  updateBudgetBar: t.procedure
    .input(updateBudgetBarSchema)
    .mutation(({ input }) => updateBudgetBarController({ input })),
  getBudgetByTerm: t.procedure
    .input(getBudgetSchema)
    .query(({ input }) => getBudgetByTermController({ input })),

  getAllCourses: t.procedure.query(() => getAllCoursesController()),
  updateCourse: t.procedure.input(updateCourseSchema).mutation(({ input }) => {
    updateCourse({ input });
  }),
});

export type AppRouter = typeof appRouter;
