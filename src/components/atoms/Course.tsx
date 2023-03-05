import React from "react";

interface CourseProps {
  courseNumber: string;
  courseName: string;
}

const Course = ({ courseNumber, courseName }: CourseProps) => {
  return (
    <div className="flex-1 text-left spacing-y-1">
      <p className="font-semibold">{courseNumber}</p>
      <p className="text-xs">{courseName}</p>
    </div>
  );
};

export default Course;
