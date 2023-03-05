import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BudgetPage, { BudgetSectionTitle } from "../budget";

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
