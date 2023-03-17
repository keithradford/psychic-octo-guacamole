import { Modal } from "@/components/molecules";
import { trpc } from "@/utils/trpc";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BudgetBar } from "@prisma/client";
import { useMemo, useState } from "react";
import { Button, Input, PercentBar } from "../components/atoms";
import { NextPageWithLayout } from "./_app";

export const BudgetSectionTitle = ({
  title,
  max,
  current,
  buttonOnClick = () => {},
}: {
  title: string;
  max: number;
  current: number;
  buttonOnClick?: () => void;
}) => {
  return (
    <div className="flex flex-col space-y-1 w-60">
      <div className="flex justify-between">
        <h1 className="text-xl">{title}</h1>
        <Button onClick={buttonOnClick}>
          <PlusIcon className="w-3 h-3" />
        </Button>
      </div>
      <p className="font-light">
        ${current} of ${max}
      </p>
    </div>
  );
};

const BudgetPage: NextPageWithLayout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isIncomeSelected, setIsIncomeSelected] = useState(true);

  const [selectedPercentBar, setSelectedPercentBar] = useState<BudgetBar>();

  const [titleInput, setTitleInput] = useState("");
  const [maxInput, setMaxInput] = useState(0);
  const [currentValueInput, setCurrentValueInput] = useState(0);

  const budget = trpc.getBudgetByTerm.useQuery({
    term: "SPRING 2022",
  });
  const { mutateAsync: addBudgetBarToBudget } =
    trpc.addBudgetBarToBudget.useMutation({
      onSuccess: () => {
        budget.refetch();
      },
    });
  const { mutateAsync: updateBudgetBar } = trpc.updateBudgetBar.useMutation({
    onSuccess: () => {
      budget.refetch();
    },
  });

  const incomeBars = useMemo(() => {
    if (!budget.data?.budget?.budgetBars) return [];

    return budget.data.budget.budgetBars.filter((bar) => {
      return bar.isIncome;
    });
  }, [budget.data?.budget?.budgetBars]);

  const spendBars = useMemo(() => {
    if (!budget.data?.budget?.budgetBars) return [];

    return budget.data.budget.budgetBars.filter((bar) => {
      return !bar.isIncome;
    });
  }, [budget.data?.budget?.budgetBars]);

  const incomeBarStats = useMemo(() => {
    let max = 0;
    let current = 0;

    incomeBars.forEach((bar) => {
      max += bar.max;
      current += bar.currentVal;
    });

    return { max, current };
  }, [incomeBars]);

  const spendBarStats = useMemo(() => {
    let max = 0;
    let current = 0;

    spendBars.forEach((bar) => {
      max += bar.max;
      current += bar.currentVal;
    });

    return { max, current };
  }, [spendBars]);

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row flex-grow space-x-5">
        <BudgetSectionTitle
          title="Income"
          max={incomeBarStats.max}
          current={incomeBarStats.current}
          buttonOnClick={() => {
            setIsIncomeSelected(true);
            setModalOpen(true);
          }}
        />
        <div className="flex flex-col w-full space-y-5">
          {incomeBars.map((bar) => {
            return (
              <PercentBar
                key={bar.id}
                title={bar.title}
                max={bar.max}
                current={bar.currentVal}
                onClick={() => {
                  setSelectedPercentBar(bar);
                  setCurrentValueInput(bar.currentVal);
                  setTitleInput(bar.title);
                  setMaxInput(bar.max);

                  setModalOpen(true);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full border" />
      <div className="flex flex-row flex-grow space-x-5">
        <BudgetSectionTitle
          title="Spending"
          max={spendBarStats.max}
          current={spendBarStats.current}
          buttonOnClick={() => {
            setIsIncomeSelected(false);
            setModalOpen(true);
          }}
        />
        <div className="flex flex-col w-full space-y-5">
          {spendBars.map((bar) => {
            return (
              <PercentBar
                key={bar.id}
                title={bar.title}
                max={bar.max}
                current={bar.currentVal}
                onClick={() => {
                  setSelectedPercentBar(bar);
                  setCurrentValueInput(bar.currentVal);
                  setTitleInput(bar.title);
                  setMaxInput(bar.max);

                  setModalOpen(true);
                }}
              />
            );
          })}
        </div>
      </div>
      <Modal
        title={
          selectedPercentBar
            ? `Set value for ${selectedPercentBar?.title}`
            : `Add an ${isIncomeSelected ? "income" : "expense"} stream`
        }
        confirmOnClick={() => {
          if (!budget.data?.budget) return;

          if (selectedPercentBar) {
            updateBudgetBar({
              budgetId: budget.data.budget.id,
              budgetBarId: selectedPercentBar.id,
              current: currentValueInput,
              max: maxInput,
              title: titleInput,
            });
          } else {
            addBudgetBarToBudget({
              budgetId: budget.data.budget.id,
              current: currentValueInput,
              isIncome: isIncomeSelected,
              max: maxInput,
              title: titleInput,
            });
          }
        }}
        open={isModalOpen}
        setModal={(open: boolean) => {
          setModalOpen(open);

          setTitleInput("");
          setCurrentValueInput(0);
          setMaxInput(0);
          setSelectedPercentBar(undefined);
        }}
      >
        <div className="flex flex-col space-y-3">
          <Input
            title={"Title..."}
            value={titleInput}
            setValue={(val: string) => {
              setTitleInput(val.toString());
            }}
          />
          <Input
            title={"Max Value..."}
            value={maxInput}
            setValue={(val: string) => {
              if (val === "") setMaxInput(0);
              const fl = parseFloat(val);
              if (!isNaN(fl)) setMaxInput(fl);
            }}
          />
          <Input
            title={"Initial Value..."}
            value={currentValueInput}
            setValue={(val: string) => {
              if (val === "") setCurrentValueInput(0);
              const fl = parseFloat(val);
              if (!isNaN(fl)) setCurrentValueInput(fl);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BudgetPage;
