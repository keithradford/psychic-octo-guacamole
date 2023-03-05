import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "..";

describe("Index page", () => {
  it("should render correctly", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
