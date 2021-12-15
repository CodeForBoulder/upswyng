import BackButton from "./BackButton";
import BannerColorContext from "./BannerColorContext";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import React from "react";
import { colors } from "@upswyng/common";
interface Props {
  children: React.ReactNode;
  color?: string;
  backButtonAction?: (() => void) | null;
}

const PageBanner = ({ children, color, backButtonAction }: Props) => {
  const { currentBannerColor, updateCurrentBannerColor } = React.useContext(
    BannerColorContext
  );

  React.useEffect(() => {
    updateCurrentBannerColor(color);
  }, [color, updateCurrentBannerColor]);
  return (
    <Box bgcolor={currentBannerColor || colors.black} mb={4} py={2}>
      <Grid container wrap="nowrap" alignItems="center" spacing={1}>
        <Grid item>
          <IconButton>
            <BackButton backButtonAction={backButtonAction} />
          </IconButton>
        </Grid>
        <List>
          <Grid item>{children}</Grid>
        </List>
      </Grid>
    </Box>
  );
};

export default PageBanner;
