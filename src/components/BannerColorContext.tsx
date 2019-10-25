import React from 'react';

import { colors } from '../App.styles';

interface ContextShape {
  bannerColor: string;
  setBannerColor: Function;
}

const Context = React.createContext<ContextShape>({
  bannerColor: '',
  setBannerColor: () => {}
});

interface Props {
  children: React.ReactNodeArray;
}

export const BannerColorContextProvider = ({ children }: Props) => {
  const [bannerColor, setBannerColor] = React.useState<string>(
    colors.orangeDark
  );

  return (
    <Context.Provider value={{ bannerColor, setBannerColor }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
