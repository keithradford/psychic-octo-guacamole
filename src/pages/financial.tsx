import { Button, Dropdown, Spinner } from "@/components/atoms";
import Course from "@/components/atoms/Course";
import { trpc } from "@/utils/trpc";
import { Menu } from "@headlessui/react";
import { Course as CourseObj } from "@prisma/client";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { NextPageWithLayout } from "./_app";

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
  const [term, setTerm] = useState("SPRING 2022");
  const [allTerms, setAllTerms] = useState([
    "SPRING 2022",
    "WINTER 2021",
    "SUMMER 2021",
  ]);

  const financialStatement = trpc.getFinancialStatementByTerm.useQuery({
    term: term,
  });
  const allCourses = trpc.getAllCourses.useQuery();

  const { mutateAsync: addCourseToFinancialStatement } =
    trpc.addCourseToFinancialStatement.useMutation({
      onSuccess: () => {
        financialStatement.refetch();
      },
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

  if (financialStatement.isLoading || allCourses.isLoading)
    return (
      <div className="flex justify-center w-full">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col w-full max-w-5xl">
      <div className="space-x-2">
        <p className="inline-block text-lg font-bold">Financial Statements</p>
        <Dropdown buttonText="Filter">
          {allTerms.map((term) => {
            return (
              <Menu.Item key={term}>
                {({ active }) => (
                  <div
                    onClick={() => {
                      setTerm(term);
                    }}
                    className={classNames(
                      "hover:cursor-pointer",
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {term}
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Dropdown>
        <Dropdown buttonText="Add Course">
          {allCourses.data?.courses.map((course) => {
            return (
              <Menu.Item key={course.id}>
                {({ active }) => (
                  <div
                    onClick={() => {
                      if (financialStatement.data?.financialStatement?.id)
                        addCourseToFinancialStatement({
                          courseId: course.id,
                          financialStatementId:
                            financialStatement.data.financialStatement.id,
                        });
                    }}
                    className={classNames(
                      "hover:cursor-pointer",
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {course.title}
                  </div>
                )}
              </Menu.Item>
            );
          })}
        </Dropdown>
      </div>
      <div className="flex flex-col content-between max-w-full border-b border-gray-300">
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
                <Button
                  theme="filled"
                  onClick={() => {
                    window.location.href =
                      "https://www.uvic.ca/residence/future-residents/fees/payments/index.php";
                  }}
                >
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
