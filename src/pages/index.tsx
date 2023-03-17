import { trpc } from "@/utils/trpc";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { mutateAsync: createBudget } = trpc.createBudget.useMutation({});
  const { mutateAsync: createFinancialStatement } =
    trpc.createFinancialStatement.useMutation({});
  const budget = trpc.getBudgetByTerm.useQuery({ term: "SPRING 2022" });

  const buttonOnClick = () => {
    createBudget({ term: "SPRING 2022" });
  };

  const buttonOnClick2 = () => {
    createFinancialStatement({ term: "SPRING 2022" });
  };

  return (
    <div>
      <button onClick={buttonOnClick}> hello </button>
      <button onClick={buttonOnClick2}> hello2 </button>
      UVic Finance System
      <div>{JSON.stringify(budget.data?.budget)}</div>
    </div>
  );
}
