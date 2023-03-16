import { z } from "zod";

export const createHelloSchema = z.object({
  message: z.string(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export const params = z.object({
  helloId: z.string(),
});

export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateHelloSchema = z.TypeOf<typeof createHelloSchema>;
export type ParamsInput = z.TypeOf<typeof params>;
