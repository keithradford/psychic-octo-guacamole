import { NextPageWithLayout } from "./_app";

import React, { PureComponent, useMemo } from "react";
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
import { trpc } from "@/utils/trpc";

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
  const financialStatements = trpc.getAllFinancialStatements.useQuery();
  const budget = trpc.getBudgetByTerm.useQuery({ term: "SPRING 2022" });

  const barChartData = useMemo(() => {
    if (!financialStatements.data?.financialStatements) return [];

    const data = [];

    financialStatements.data.financialStatements.forEach((statement) => {
      const courses: Map<string, number> = new Map<string, number>();
      statement.courses.forEach((course) => {
        courses.set(course.subjectCode, course.cost);
      });
      data.push({
        name: statement.term,
        ...courses,
      });
    });
  }, [financialStatements.data?.financialStatements]);

  const pieChartData = useMemo(() => {
    if (!budget.data?.budget?.budgetBars) return [];

    const data: { name: string; value: number }[] = [];

    budget.data.budget.budgetBars
      .filter((bar) => {
        return !bar.isIncome;
      })
      .forEach((bar) => {
        data.push({
          name: bar.title,
          value: bar.currentVal,
        });
      });

    return data;
  }, [budget.data?.budget]);

  return (
    <div className="flex flex-row w-full py-24 place-content-around ">
      <div className="flex flex-col content-center justify-center">
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
              data={pieChartData}
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
              {pieChartData.map((entry, index) => {
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
        <div className="flex justify-end w-full">
          <Button theme="outline" onClick={() => {}}>
            Export Data
          </Button>
        </div>
      </div>
      <div className="flex flex-col content-center justify-center">
        <ResponsiveContainer width={700} height={500}>
          <BarChart
            width={400}
            height={200}
            data={barChartData}
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
        <div className="flex justify-end w-full">
          <Button theme="outline" onClick={() => {}}>
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;
