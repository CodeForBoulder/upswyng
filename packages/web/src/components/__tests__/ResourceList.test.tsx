import React from "react";
import ResourceList from "../ResourceList";
import { mockResources } from "../../data-mocks";
import { render } from "@testing-library/react";

jest.mock("../LoadingSpinner", () => () => "TEST-loading-spinner");
jest.mock("../ResourceCard", () => () => (
  <div data-test="TEST-resource-card" />
));

describe("<ResourceList/>", () => {
  function setup(overrides = {}) {
    return render(<ResourceList resources={mockResources} {...overrides} />);
  }

  it("renders a loading spinner when resources are not loaded", () => {
    const resources = undefined;
    const { getByText } = setup({ resources });

    expect(getByText("TEST-loading-spinner")).toBeInTheDocument();
  });

  it("renders a resource for each resource in the list", () => {
    const resources = mockResources;
    const { getAllByTestId } = setup({ resources });

    expect(getAllByTestId("TEST-resource-card")).toHaveLength(resources.length);
  });
});
