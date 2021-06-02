import HomeButtons, { routerLinkButtons } from "../HomeButtons";

import React from "react";
import { render } from "@testing-library/react";

jest.mock(
  "../HomeLink",
  () => ({ children }: { children: React.ReactChildren }) => (
    <div>{children}</div>
  )
);

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
  const routerLinkTexts = routerLinkButtons.map(
    ({ translationKey }) => translationKey
  );

  it.each(routerLinkTexts)("renders the %s button", text => {
    const { getByText } = render(<HomeButtons />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
