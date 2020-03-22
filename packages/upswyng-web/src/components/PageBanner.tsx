import { colors, font } from "../App.styles";

import BackButton from "./BackButton";
import BannerColorContext from "./BannerColorContext";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";

interface Props {
  color?: string;
  text: string;
  backButtonAction?: (() => void) | null;
}

const PageBanner = ({ color, text, backButtonAction }: Props) => {
  const { currentBannerColor, updateCurrentBannerColor } = React.useContext(
    BannerColorContext
  );

  React.useEffect(() => {
    updateCurrentBannerColor(color);
  }, [color, updateCurrentBannerColor]);

  return (
    <Box bgcolor={currentBannerColor || colors.black} py={2}>
      <Grid container wrap="nowrap" alignItems="center" spacing={1}>
        <Grid item>
          <BackButton backButtonAction={backButtonAction} />
        </Grid>
        <Grid item>
          <Box component="h1" fontSize={font.helpers.convertPixelsToRems(24)}>
            {text}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageBanner;
