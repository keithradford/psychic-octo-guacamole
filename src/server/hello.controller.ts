import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { CreateHelloSchema, ParamsInput } from "./hello.schema";

const prisma = new PrismaClient();

export const createHelloController = async ({
  input,
}: {
  input: CreateHelloSchema;
}) => {
  const hello = await prisma.hello.create({
    data: {
      message: input.message,
    },
  });

  return {
    status: "success",
    data: {
      hello,
    },
  };
};

export const findHelloController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const note = await prisma.hello.findFirst({
      where: { id: paramsInput.helloId },
    });

    if (!note) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Hello with that ID not found",
      });
    }

    return {
      status: "success",
      note,
    };
  } catch (error) {
    throw error;
  }
};

export const findAllHellosController = async () => {
  try {
    const notes = await prisma.hello.findMany();

    return {
      status: "success",
      results: notes.length,
      notes,
    };
  } catch (error) {
    throw error;
  }
};
