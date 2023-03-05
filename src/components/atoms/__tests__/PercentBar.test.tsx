import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { PercentBar } from "../PercentBar";

describe("Percent bar", () => {
  it("should display the title", () => {
    const { getByText } = render(
      <PercentBar title="Income" max={1000} current={671} />
    );
    expect(getByText("Income")).toBeInTheDocument();
  });

  it("should display the current amount", () => {
    const { getByText } = render(
      <PercentBar title="Income" max={1000} current={671} />
    );
    expect(getByText(/\$671/)).toBeInTheDocument();
  });

  it("should display the max amount", () => {
    const { getByText } = render(
      <PercentBar title="Income" max={1000} current={671} />
    );
    expect(getByText(/\$1000/)).toBeInTheDocument();
  });

  it("should have the correct width", () => {
    const max = 1000;
    const current = 671;
    const { getByTestId } = render(
      <PercentBar title="Income" max={max} current={current} />
    );
    const percentWidth = (current / max) * 100;
    expect(getByTestId("percent-bar")).toHaveStyle(`width: ${percentWidth}%`);
  });
});
