import React from "react";

import { colors } from "../App.styles";

interface ContextShape {
  currentBannerColor: string;
  updateCurrentBannerColor: Function;
}

const Context = React.createContext<ContextShape>({
  currentBannerColor: "",
  updateCurrentBannerColor: () => {},
});

interface Props {
  children: React.ReactNodeArray;
}

export const BannerColorContextProvider = ({ children }: Props) => {
  const [currentBannerColor, setCurrentBannerColor] = React.useState<string>(
    ""
  );
  const updateCurrentBannerColor = (color?: string) =>
    setCurrentBannerColor(color || "");

  return (
    <Context.Provider
      value={{
        currentBannerColor,
        updateCurrentBannerColor,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
