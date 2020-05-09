import React from "react";

interface ContextShape {
  currentBannerColor: string;
  updateCurrentBannerColor: Function;
}

const Context = React.createContext<ContextShape>({
  currentBannerColor: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
