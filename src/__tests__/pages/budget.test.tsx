import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BudgetPage, { BudgetSectionTitle } from "../../pages/budget";

jest.mock("../../utils/trpc", () => ({
  trpc: {
    getBudgetByTerm: {
      useQuery: () => ({
        data: {
          budget: {
            budgetBars: [
              {
                id: 1,
                name: "Income",
                max: 1000,
                currentVal: 671,
                isIncome: true,
              },
              {
                id: 2,
                name: "Spend",
                max: 1000,

                currentVal: 671,
                isIncome: false,
              },
            ],
          },
        },
      }),
    },
    addBudgetBarToBudget: {
      useMutation: () => ({
        mutateAsync: () => {},
      }),
    },
    updateBudgetBar: {
      useMutation: () => ({
        mutateAsync: () => {},
      }),
    },
  },
}));

describe("Budget page", () => {
  it("should render correctly", () => {
    const { container } = render(<BudgetPage />);
    expect(container).toMatchSnapshot();
  });
});

describe("Budget section title", () => {
  it("should display the title", () => {
    const { getByText } = render(
      <BudgetSectionTitle title="Income" max={1000} current={671} />
    );
    expect(getByText("Income")).toBeInTheDocument();
  });

  it("should display the current amount", () => {
    const { getByText } = render(
      <BudgetSectionTitle title="Income" max={1000} current={671} />
    );
    expect(getByText(/\$671/)).toBeInTheDocument();
  });

  it("should display the max amount", () => {
    const { getByText } = render(
      <BudgetSectionTitle title="Income" max={1000} current={671} />
    );
    expect(getByText(/\$1000/)).toBeInTheDocument();
  });
});
