import React from "react";
import { shallow } from "enzyme";
import Search from "../Search";
import { getSearchParamVal } from "../../utils/searchParams";

const mockedGetSearchParamVal = getSearchParamVal as jest.Mock;
jest.mock("../../utils/searchParams", () => ({
  getSearchParamVal: jest.fn(),
}));
jest.mock("../useSearchResults");
jest.mock("react-router-dom", () => ({
  Link: "Link",
}));

describe("<Search/>", () => {
  const getSubject = () => shallow(<Search />);

  it("renders a <SearchResults/> when provided a search query", () => {
    mockedGetSearchParamVal.mockImplementation(() => "a search query");
    expect(getSubject().find("SearchResults").length).toBe(1);
  });

  it("does not render <SearchResults/> when a search query is not provided", () => {
    mockedGetSearchParamVal.mockImplementation(() => null);
    expect(getSubject().find("SearchResults").length).toBe(0);
  });
});
