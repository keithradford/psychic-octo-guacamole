// import { initTRPC } from "@trpc/server";

// // Avoid exporting the entire t-object
// // since it's not very descriptive.
// // For instance, the use of a t variable
// // is common in i18n libraries.
// const t = initTRPC.create();

// // Base router and procedure helpers
// export const router = t.router;
// export const procedure = t.procedure;

import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  createHelloController,
  findAllHellosController,
  findHelloController,
} from "../hello.controller";
import { createHelloSchema, filterQuery, params } from "../hello.schema";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  hello: t.procedure.query((req) => {
    return { message: "Welcome to Full-Stack tRPC CRUD App with Next.js" };
  }),
  createHello: t.procedure
    .input(createHelloSchema)
    .mutation(({ input }) => createHelloController({ input })),
  getHello: t.procedure
    .input(params)
    .query(({ input }) => findHelloController({ paramsInput: input })),
  getHellos: t.procedure.query(() => findAllHellosController()),
});

export type AppRouter = typeof appRouter;
