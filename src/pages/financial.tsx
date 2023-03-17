import { useState, useMemo } from "react";
import { NextPageWithLayout } from "./_app";
import { Button } from "../components/atoms/Button";
import Course from "../components/atoms/Course";
import { trpc } from "@/utils/trpc";
import { Course as CourseObj } from "@prisma/client";

//Row Component
const Row = ({ course }: { course: CourseObj }) => {
  const { cost, credits, subjectCode, title } = course;
  return (
    <div className="flex items-center m-3 ">
      <Course subjectCode={subjectCode} courseName={title} />
      <p className="flex-1 text-center">${cost}</p>
      <p className="flex-1 text-center">{credits}</p>
    </div>
  );
};

const FinancialPage: NextPageWithLayout = () => {
  const financialStatement = trpc.getFinancialStatementByTerm.useQuery({
    term: "SPRING 2022",
  });

  const totalCost: number = useMemo(() => {
    if (!financialStatement.data?.financialStatement?.courses) return 0;

    let cost = 0;
    financialStatement.data?.financialStatement.courses.forEach((course) => {
      cost += course.cost;
    });

    return cost;
  }, [financialStatement.data?.financialStatement]);

  const totalCredits: number = useMemo(() => {
    if (!financialStatement.data?.financialStatement?.courses) return 0;

    let credits = 0;
    financialStatement.data?.financialStatement.courses.forEach((course) => {
      credits += course.credits;
    });

    return credits;
  }, [financialStatement.data?.financialStatement]);

  return (
    <div className="flex flex-col w-full max-w-5xl">
      <div className="space-x-2">
        <p className="inline-block m-5 text-lg font-bold">
          Financial Statements
        </p>
        <Button theme="outline" onClick={() => {}}>
          Filter
        </Button>
        <Button theme="filled" onClick={() => {}}>
          Add Course
        </Button>
      </div>
      <div className="flex flex-col content-between max-w-full border border-black">
        <div className="flex m-3">
          <p className="flex-1 text-lg font-bold text-left">Courses</p>
          <p className="flex-1 text-lg font-bold text-center">Costs</p>
          <p className="flex-1 text-lg font-bold text-center">Credits</p>
        </div>
        {financialStatement.data?.financialStatement ? (
          financialStatement.data.financialStatement.courses.map(
            (course, index) => {
              return <Row key={index} course={course} />;
            }
          )
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col max-w-full ">
        <div className="flex items-center m-3">
          <div className="flex-1"></div>
          <div className="flex-1 ">
            <div className="flex items-center">
              <p className="flex-1 text-left">Total Costs:</p>
              <p className="flex-1 text-center">${totalCost}</p>
              <div className="flex-1"></div>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="flex items-center">
              <p className="flex-1 text-left">Total Credits:</p>
              <p className="flex-1 text-center">{totalCredits}</p>
              <div className="flex-1 text-center">
                <Button theme="filled" onClick={() => {}}>
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPage;
