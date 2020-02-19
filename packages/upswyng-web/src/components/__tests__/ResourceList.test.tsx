import React from "react";
import ResourceList from "../ResourceList";
import { mockResources } from "../../DataMocks";
import { mount } from "enzyme";

jest.mock("../LoadingSpinner", () => () => "TEST-loading-spinner");
jest.mock("../ResourceCard", () => () => (
  <div data-test="TEST-resource-card" />
));

describe("<ResourceList/>", () => {
  function renderWith(overrides = {}) {
    return mount(<ResourceList resources={mockResources} {...overrides} />);
  }

  it("renders a loading spinner when resources are not loaded", () => {
    const resources = undefined;
    const subject = renderWith({ resources });

    expect(subject.text()).toContain("TEST-loading-spinner");
  });

  it("renders a resource for each resource in the list", () => {
    const resources = mockResources;
    const subject = renderWith({ resources });

    expect(subject.find('[data-test="TEST-resource-card"]')).toHaveLength(
      resources.length
    );
  });
});
