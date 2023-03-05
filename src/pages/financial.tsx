import { useState } from 'react';
import { NextPageWithLayout } from './_app';
import { Button } from '../components/atoms/Button';
import Course from '../components/atoms/Course';

//Course Interface
interface course {
  courseNumber: string;
  courseName: string;
  cost: number;
  credit: number;
};

interface terms {
  term: string;
  courses: course[];
}

//Row Component
const Row: ({ courseNumber, courseName, cost, credit }: course) => JSX.Element = ({ courseNumber, courseName, cost, credit }: course) => {

  return (
    <div className="flex items-center m-3 ">
      <Course courseNumber={courseNumber} courseName={courseName} />
      <p className="flex-1 text-center">${cost}</p>
      <p className="flex-1 text-center">{credit}</p>
    </div>
  );
};


const FinancialPage: NextPageWithLayout = () => {

  const [courses, setCourses] = useState<course[]>([
    { courseNumber: 'Seng 321', courseName: 'Requirements Engineering', cost: 200.99, credit: 1.5 },
    { courseNumber: 'Seng 321', courseName: 'Requirements Engineering', cost: 200.99, credit: 1.5 },
    { courseNumber: 'Seng 371', courseName: 'Software Evolution', cost: 200.99, credit: 1.5 }
    ]);

  const rows:JSX.Element[] = courses.map((course, index) => (
    <Row key={index} courseNumber={course.courseNumber} courseName={course.courseName} cost={course.cost} credit={course.credit} />
  ));

  const totalCost:any = courses.reduce((total, current): any => {
    if (total.cost && current.cost) {
      return (total.cost + current.cost);
    }
    else {
      return (Number(total) + current.cost);
    }
  });

  const totalCredits:any = courses.reduce((total, current): any => {
    if (total.credit) {
      return (total.credit + current.credit);
    }
    else {
      return (Number(total) + current.credit);
    }
  });

  return (
    <>
      <div>
        <p className="font-bold text-lg m-5 inline-block">Financial Statements</p>
        <Button theme="outline" onClick={() => { }}>Filter</Button>
      </div>
      <div className="flex max-w-full border border-black flex-col content-between">
        <div className="flex m-3">
          <p className="flex-1 text-left text-lg font-bold">Courses</p>
          <p className="flex-1 text-center text-lg font-bold">Costs</p>
          <p className="flex-1 text-center text-lg font-bold">Credits</p>
        </div>
        {rows}
      </div>
      <div className="flex max-w-full flex-col ">
        <div className="flex m-3 items-center">
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
                <Button theme="filled" onClick={() => { }}>Pay Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialPage;
