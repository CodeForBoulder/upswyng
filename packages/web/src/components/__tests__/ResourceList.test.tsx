import React from "react";
import ResourceList from "../ResourceList";
import { TResource } from "@upswyng/types";
import { mockResources } from "../../data-mocks";
import { render } from "@testing-library/react";

jest.mock("../LoadingSpinner", () => () => "TEST-loading-spinner");
jest.mock("../ResourceCard", () => () => (
  <div data-test="TEST-resource-card" />
));

describe("<ResourceList/>", () => {
  function setup(overrides = {}) {
    return render(
      <ResourceList resources={mockResources} status="success" {...overrides} />
    );
  }

  it("renders a loading spinner when resources are loading", () => {
    const status = "loading";
    const { getByText } = setup({ status });

    expect(getByText("TEST-loading-spinner")).toBeInTheDocument();
  });

  it("renders an error message when failed to retrieve resources", () => {
    const status = "error";
    const { getByText } = setup({ status });

    expect(getByText(/try again/i)).toBeInTheDocument();
  });

  it("renders an error message when successfully retrieved resources but response is empty", () => {
    const resources = [] as TResource[];
    const { getByText } = setup({ resources });

    expect(getByText(/try again/i)).toBeInTheDocument();
  });

  it("renders a resource for each resource in the list", () => {
    const resources = mockResources;
    const { getAllByTestId } = setup({ resources });

    expect(getAllByTestId("TEST-resource-card")).toHaveLength(resources.length);
  });
});
