import { PrismaClient } from "@prisma/client";
import { UpdateCourseSchema } from "../schemas/course.schema";

const prisma = new PrismaClient();

export const getAllCoursesController = async () => {
  const courses = await prisma.course.findMany({});

  return {
    courses,
  };
};

export const updateCourse = async ({
  input: {
    data: { financialStatementId },
    courseId,
  },
}: {
  input: UpdateCourseSchema;
}) => {
  const course = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      FinancialStatemetn: {
        connect: {
          id: financialStatementId,
        },
      },
    },
  });

  return {
    course,
  };
};
