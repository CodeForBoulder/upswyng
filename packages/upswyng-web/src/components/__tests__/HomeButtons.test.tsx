import HomeButtons, { routerLinkButtons } from "../HomeButtons";
import React from "react";
import { render } from "@testing-library/react";

jest.mock("../HomeLink", () => ({
  HomeRouterLink: ({ children }: { children: React.ReactChildren }) => (
    <div>{children}</div>
  ),
}));

describe("<HomeButtons/>", () => {
  const routerLinkTexts = routerLinkButtons.map(({ text }) => text);
  it.each(routerLinkTexts)("renders the %s button", text => {
    const { getByText } = render(<HomeButtons />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
