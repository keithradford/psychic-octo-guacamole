import { PercentBar } from "../components/atoms";
import { NextPageWithLayout } from "./_app";

const BudgetSectionTitle = ({
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
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row flex-grow">
        <BudgetSectionTitle title="Income" max={1000} current={671} />
        <PercentBar title="Paycheque" max={1000} current={671} />
      </div>
      <div className="w-full border" />
      <div className="flex flex-row flex-grow">
        <BudgetSectionTitle title="Spending" max={300} current={95} />
        <div className="flex flex-col w-full space-y-5">
          <PercentBar title="Entertainment" max={100} current={15} />
          <PercentBar title="Food" max={100} current={30} />
          <PercentBar title="Transport" max={100} current={50} />
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
