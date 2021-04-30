import HomeButtons, { routerLinkButtons } from "../HomeButtons";

import React from "react";
import { render } from "@testing-library/react";

jest.mock("../HomeLink", () => ({
  HomeRouterLink: ({ children }: { children: React.ReactChildren }) => (
    <div>{children}</div>
  ),
}));
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => ({})),
      },
    };
  },
}));

describe("<HomeButtons/>", () => {
  const routerLinkTexts = routerLinkButtons.map(
    ({ translationKey }) => translationKey
  );
  it.each(routerLinkTexts)("renders the %s button", text => {
    const { getByText } = render(<HomeButtons />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
