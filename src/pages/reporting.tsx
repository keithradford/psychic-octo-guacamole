import { NextPageWithLayout } from "./_app";

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { Button } from "@/components/atoms";

const data = [
  {
    name: "Winter",
    class1: 600,
    class2: 400,
    class3: 523,
  },
  {
    name: "Summer",
    class1: 660,
    class2: 500,
    class3: 670,
  },
  {
    name: "Spring",
    class1: 680,
    class2: 700,
    class3: 690,
  },
];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const colors: string[] = [
  "#FFBF00",
  "#DE3163",
  "#CCCCFF",
  "#6495ED",
  "#9FE2BF",
  "#40E0D0",
];

const ReportingPage: NextPageWithLayout = () => {
  return (
    <div
      className="flex flex-row w-full py-24"
      style={{ justifyContent: "space-around", overflow: "auto" }}
    >
      <div
        className="flex"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer width={700} height={500}>
          <PieChart width={400} height={400}>
            <text
              x="50%"
              y="2%"
              dy={+12}
              className={"font-semibold text-primary"}
              style={{ fontSize: 24, fill: "rgb(0 84 147)" }}
              textAnchor="middle"
              z={100}
            >
              Meal Plan: Breakdown Analyis
            </text>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={175}
              label={(props) => {
                const RADIAN = Math.PI / 180;
                // eslint-disable-next-line
                const radius =
                  25 +
                  props.innerRadius +
                  (props.outerRadius - props.innerRadius);
                // eslint-disable-next-line
                const x =
                  props.cx + radius * Math.cos(-props.midAngle * RADIAN);
                // eslint-disable-next-line
                const y =
                  props.cy + radius * Math.sin(-props.midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={x > props.cx ? "start" : "end"}
                    dominantBaseline="central"
                    fill="rgb(0 84 147)"
                    className="font-semibold text-primary"
                  >
                    {`${props.name} - $${props.value}`}
                  </text>
                );
              }}
            >
              {data01.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex w-full" style={{ justifyContent: "right" }}>
          <Button theme="outline" onClick={() => {}}>
            Export Data
          </Button>
        </div>
      </div>
      <div
        className="flex"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer width={700} height={500}>
          <BarChart
            width={400}
            height={200}
            data={data}
            title={"Cost of Tuition per Term"}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <text
              x="50%"
              y="2%"
              dy={+12}
              className={"font-semibold text-primary"}
              style={{ fontSize: 24, fill: "rgb(0 84 147" }}
              textAnchor="middle"
              z={100}
            >
              Cost of Tuition per Term
            </text>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fillOpacity: 0.4 }} />
            <Legend />
            <Bar dataKey="class1" fill="#8884d8" />
            <Bar dataKey="class2" fill="#82ca9d" />
            <Bar dataKey="class3" fill="#863d1c" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex w-full" style={{ justifyContent: "right" }}>
          <Button theme="outline" onClick={() => {}}>
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;
