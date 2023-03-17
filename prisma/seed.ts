import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Course = {
  subjectCode: string;
  title: string;
};

const courses: Course[] = [
  {
    subjectCode: "SENG 371",
    title: "Software Evolution",
  },
  {
    subjectCode: "SENG 499",
    title: "Design Project II",
  },
  {
    subjectCode: "CSC 320",
    title: "Foundations of Computer Science",
  },
  {
    subjectCode: "SENG 350",
    title: "Software Architecture and Design",
  },
  {
    subjectCode: "SENG 360",
    title: "Security Engineering",
  },
  {
    subjectCode: "SENG 321",
    title: "Requirements Engineering",
  },
  {
    subjectCode: "MATH 100",
    title: "Calculus I",
  },
  {
    subjectCode: "MATH 101",
    title: "Calculus II",
  },
  {
    subjectCode: "PHYS 110",
    title: "Introductory Physics I",
  },
];

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function main() {
  if ((await prisma.course.count()) === 0) {
    courses.forEach(async (course, i) => {
      await prisma.course.create({
        data: {
          ...course,
          id: String(i),
          cost: randomNumber(500, 700),
          credits: 1.5,
        },
      });
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
