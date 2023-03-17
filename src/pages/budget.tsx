import { trpc } from "@/utils/trpc";
import { useMemo } from "react";
import { PercentBar } from "../components/atoms";
import { NextPageWithLayout } from "./_app";

export const BudgetSectionTitle = ({
  title,
  max,
  current,
}: {
  title: string;
  max: number;
  current: number;
}) => {
  return (
    <div className="flex flex-col space-y-1 w-60">
      <h1 className="text-xl">{title}</h1>
      <p className="font-light">
        ${current} of ${max}
      </p>
    </div>
  );
};

const BudgetPage: NextPageWithLayout = () => {
  const financialStatement = trpc.getBudgetByTerm.useQuery({
    term: "SPRING 2022",
  });

  const incomeBars = useMemo(() => {
    if (!financialStatement.data?.budget?.budgetBars) return [];

    return financialStatement.data.budget.budgetBars.filter((bar) => {
      return bar.isIncome;
    });
  }, [financialStatement.data?.budget?.budgetBars]);

  const spendBars = useMemo(() => {
    if (!financialStatement.data?.budget?.budgetBars) return [];

    return financialStatement.data.budget.budgetBars.filter((bar) => {
      return !bar.isIncome;
    });
  }, [financialStatement.data?.budget?.budgetBars]);

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row flex-grow">
        <BudgetSectionTitle title="Income" max={1000} current={671} />
        <div className="flex flex-col w-full space-y-5">
          {incomeBars.map((bar) => {
            return (
              <PercentBar
                key={bar.id}
                title={bar.title}
                max={bar.max}
                current={bar.currentVal}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full border" />
      <div className="flex flex-row flex-grow">
        <BudgetSectionTitle title="Spending" max={300} current={95} />
        <div className="flex flex-col w-full space-y-5">
          {spendBars.map((bar) => {
            return (
              <PercentBar
                key={bar.id}
                title={bar.title}
                max={bar.max}
                current={bar.currentVal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
