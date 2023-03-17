import React from "react";

interface CourseProps {
  subjectCode: string;
  courseName: string;
}

const Course = ({ subjectCode, courseName }: CourseProps) => {
  return (
    <div className="flex-1 text-left spacing-y-1">
      <p className="font-semibold">{subjectCode}</p>
      <p className="text-xs">{courseName}</p>
    </div>
  );
};

export default Course;
