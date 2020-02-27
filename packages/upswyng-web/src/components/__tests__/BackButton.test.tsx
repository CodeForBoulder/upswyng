import { fireEvent, render } from "@testing-library/react";
import BackButton from "../BackButton";
import React from "react";
import { useHistory } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({
    push: () => undefined,
  })),
}));
const mockUseHistory = useHistory as jest.Mock;

describe("<BackButton/>", () => {
  const setup = (overrides = {}) => {
    return render(<BackButton {...overrides} />);
  };

  it("calls the passed action when clicked", () => {
    const backButtonAction = jest.fn();
    const { getByText } = setup({ backButtonAction });

    expect(backButtonAction).not.toHaveBeenCalled();
    fireEvent.click(getByText(/go back/i));
    expect(backButtonAction).toHaveBeenCalled();
  });

  it("sends the user to the home page on click when not passed an action", () => {
    const historyPush = jest.fn();
    mockUseHistory.mockReturnValueOnce({
      push: historyPush,
    });
    const { getByText } = setup({ backButtonAction: undefined });

    expect(historyPush).not.toHaveBeenCalled();
    fireEvent.click(getByText(/go back/i));
    expect(historyPush).toHaveBeenCalledWith("/");
  });
});
