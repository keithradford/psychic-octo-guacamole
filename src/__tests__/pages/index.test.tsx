jest.mock("../../utils/hooks/useLocalStorage");

import useLocalStorage from "../../utils/hooks/useLocalStorage";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "../../pages";

const mockUseLocalStorage = jest.mocked(useLocalStorage);

describe("Index page", () => {
  beforeEach(() => {
    mockUseLocalStorage.mockImplementation(() => ["", () => {}]);
  });

  it("should render correctly", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
