import React from 'react';

interface courseIdentification {
    courseNumber: string;
    courseName: string;
}

const Course = ({courseNumber, courseName}:courseIdentification) => {
  return (
    <div className="flex-1 text-left">
        <p className="font-semibold">{courseNumber}</p>
        <p className='text-xs mt-1'>{courseName}</p>
    </div>
  )
};

export default Course;