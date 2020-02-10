import React from "react";
import { Resource } from "../Resource";
import { mount } from "enzyme";
import useResource from "../useResource";

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
jest.mock("../useResource.tsx", () => jest.fn());
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

const mockUseResource = useResource as jest.Mock;

describe("<Resource/>", () => {
  const setup = (overrides = {}) => {
    return mount(<Resource {...overrides} />);
  };

  it("renders a loading spinner when a resource is not loaded", () => {
    mockUseResource.mockReturnValueOnce(undefined);
    const wrapper = setup();

    expect(wrapper.text()).toBe("TEST-loading-spinner");
  });
});
