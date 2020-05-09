import Hotlines, { hotlineList } from "../Hotlines";
import React from "react";
import { render } from "@testing-library/react";

jest.mock("../HotlineCard", () => () => <div data-test="TEST-hotline-card" />);
jest.mock("../PageBanner", () => () => null);

describe("<Hotlines/>", () => {
  it("renders a hotline card for each hotline", () => {
    const { getAllByTestId } = render(<Hotlines />);
    expect(getAllByTestId("TEST-hotline-card")).toHaveLength(
      hotlineList.length
    );
  });
});
