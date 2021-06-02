import HomeButtons, { routerLinkButtons } from "../HomeButtons";

import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import React from "react";

jest.mock("react-i18next", () => ({
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
  afterEach(cleanup);
  const routerLinkTexts = routerLinkButtons.map(
    ({ translationKey }) => translationKey
  );

  it.each(routerLinkTexts)("renders the %s button", text => {
    const { getByText } = render(
      <MemoryRouter>
        <HomeButtons />
      </MemoryRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
  });
});
