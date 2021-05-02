import React from "react";
import { Resource } from "../Resource";
import { render } from "@testing-library/react";
import useResources from "../useResources";

jest.mock("../Categories", () => ({
  categories: {},
}));
jest.mock("../LoadingSpinner.tsx", () => () => "TEST-loading-spinner");
jest.mock("../PageBanner", () => () => "PageBanner");
jest.mock("../Map", () => () => "Map");
jest.mock("../Schedule", () => () => "Schedule");
jest.mock("react-router", () => ({
  useHistory: () => undefined,
}));
jest.mock("react-router-dom", () => ({
  useParams: () => ({ resourceId: "some resource ID" }),
}));
jest.mock("react-router-last-location", () => ({
  useLastLocation: () => false,
}));
jest.mock("../useResources.tsx", () => jest.fn());
jest.mock("../../App.styles", () => ({
  Container: () => "Container",
  colors: {
    charcoal: "",
    greyLight: "",
  },
  font: {
    families: {
      openSans: "",
    },
    helpers: {
      convertPixelsToRems: (pixels: number) => pixels,
    },
  },
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

const mockUseResources = useResources as jest.Mock;

describe("<Resource/>", () => {
  const setup = (overrides = {}) => {
    return render(<Resource {...overrides} />);
  };

  it("renders a loading spinner when a resource is not loaded", () => {
    mockUseResources.mockReturnValueOnce({
      data: undefined,
      status: "loading",
    });
    const { getByText } = setup();

    expect(getByText("TEST-loading-spinner")).toBeInTheDocument();
  });
});
