import { NextPageWithLayout } from "./_app";

import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const data = [
  {
    name: 'Winter',
    class1: 600,
    class2: 400,
    class3: 523,
  },
  {
    name: 'Summer',
    class1: 660,
    class2: 500,
    class3: 670,
  },
  {
    name: 'Spring',
    class1: 680,
    class2: 700,
    class3: 690,
  },
];

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const ReportingPage: NextPageWithLayout = () => {
  return (<div>
    <ResponsiveContainer width={700} height={700}>
        <BarChart
          width={500}
          height={300}
          data={data}
          title={"Cost of Tuition per Term"}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="class1" fill="#8884d8" />
          <Bar dataKey="class2" fill="#82ca9d" />
          <Bar dataKey="class3" fill="#863d1c" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width={700} height={700}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      </div>);
};

export default ReportingPage;
