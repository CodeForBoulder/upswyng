import LoadingSearchResults from "../LoadingSearchResults";
import React from "react";
import { render } from "@testing-library/react";

describe("<LoadingSearchResults/>", () => {
  const setup = (overrides = {}) => {
    return render(<LoadingSearchResults {...overrides} />);
  };

  it("renders a number of loading items equal to the passed number", () => {
    const numItems = 5;
    const { getAllByTestId } = setup({ numItems });

    expect(getAllByTestId("loading-item")).toHaveLength(numItems);
  });
});
