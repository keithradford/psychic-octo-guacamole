import { NextPageWithLayout } from "./_app";

import { Button } from "@/components/atoms";
import { trpc } from "@/utils/trpc";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

  const [barLegend, setBarLegend] = useState<string[]>([]);

  const barChartData = useMemo(() => {
    if (!financialStatements.data?.financialStatements) return [];

    const data: any[] = [];

    financialStatements.data.financialStatements.forEach((statement) => {
      const dataPoint: any = {};
      dataPoint["name"] = statement.term;

      statement.courses.forEach((course, i) => {
        setBarLegend((prev) => [...prev, course.title]);
        dataPoint[course.title] = course.cost;
      });

      data.push(dataPoint);
    });

    return data;
  }, [financialStatements.data?.financialStatements]);

  const barChartDownloadData = useMemo(() => {
    return (
      "text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(barChartData))
    );
  }, [barChartData]);

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

  const pieChartDownloadData = useMemo(() => {
    return (
      "text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(pieChartData))
    );
  }, [pieChartData]);

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
              Spending Breakdown
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
          <a href={`data:${pieChartDownloadData}`} download="MealPlan.json">
            <Button theme="outline" onClick={() => {}}>
              Export Data
            </Button>
          </a>
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
            {barLegend.map((key, i) => {
              return (
                <Bar dataKey={key} key={i} fill={colors[i % colors.length]} />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-end w-full">
          <a
            href={`data:${barChartDownloadData}`}
            download="TuitionPerTerm.json"
          >
            <Button theme="outline" onClick={() => {}}>
              Export Data
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;
