import enzyme, { shallow } from "enzyme";
import React from "react";
import SearchInput from "../SearchInput";

jest.mock("react-router/Redirect", () => "Redirect");
jest.mock("@material-ui/core/TextField", () => "TextField");

describe("<SearchInput />", () => {
  let wrapper: enzyme.ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchInput />);
  });

  it("renders a Styled TextField", () => {
    expect(wrapper.find("Styled(TextField)").length).toBe(1);
  });

  describe("when the <TextField/> changes", () => {
    it("has a value prop equal to the changed value", () => {
      const getRenderedTextField = (): enzyme.ShallowWrapper =>
        wrapper.find("Styled(TextField)");
      const mockInputValue = "a submitted search";

      getRenderedTextField().simulate("change", {
        target: {
          value: mockInputValue,
        },
      });
      wrapper.update();

      expect(getRenderedTextField().prop("value")).toBe(mockInputValue);
    });
  });

  describe("when the form is submitted", () => {
    it("prevents the default event action", () => {
      const mockPreventDefault = jest.fn();

      wrapper.find("form").simulate("submit", {
        preventDefault: mockPreventDefault,
      });

      expect(mockPreventDefault).toBeCalled();
    });

    describe("<Redirect/>", () => {
      const getRenderedRedirect = (): enzyme.ShallowWrapper =>
        wrapper.find("Redirect");

      it("renders", () => {
        expect(getRenderedRedirect().length).toBe(0);

        wrapper.find("form").simulate("submit", {
          preventDefault: jest.fn(),
        });
        wrapper.update();

        expect(getRenderedRedirect().length).toBe(1);
      });

      it('has a "to.search" prop containing its <TextField/>s value', () => {
        const mockInputValue = "a submitted search";

        wrapper.find("Styled(TextField)").simulate("change", {
          target: {
            value: mockInputValue,
          },
        });
        wrapper.find("form").simulate("submit", {
          preventDefault: jest.fn(),
        });
        wrapper.update();

        interface RedirectTo {
          search: string;
        }
        const redirectTo: RedirectTo = getRenderedRedirect().prop("to");

        expect(redirectTo.search).toContain(mockInputValue);
      });
    });
  });
});
