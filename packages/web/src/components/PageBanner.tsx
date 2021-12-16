import BackButton from "./BackButton";
import BannerColorContext from "./BannerColorContext";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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
          <BackButton backButtonAction={backButtonAction} />
        </Grid>

        <List>
          <ListItem>
            <Grid item>{children}</Grid>
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
};

export default PageBanner;
