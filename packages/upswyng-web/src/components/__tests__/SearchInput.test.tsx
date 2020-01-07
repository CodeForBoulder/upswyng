import enzyme, { shallow } from "enzyme";
import React from "react";
import SearchInput from "../SearchInput";

jest.mock("react-router/Redirect", () => "Redirect");
jest.mock("@material-ui/core/Input", () => "Input");
jest.mock("@material-ui/core/styles/makeStyles", () => () => () => ({}));

describe("<SearchInput />", () => {
  let wrapper: enzyme.ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchInput />);
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

      it('has a "to.search" prop containing its <Input/>s value', () => {
        const mockInputValue = "a submitted search";

        wrapper.find("Input").simulate("change", {
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
