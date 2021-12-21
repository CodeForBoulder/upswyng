import BackButton from "./BackButton";
import BannerColorContext from "./BannerColorContext";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
    <Box bgcolor={currentBannerColor || colors.black} mb={4}>
      <List disablePadding>
        <ListItem>
          <ListItemIcon>
            <BackButton backButtonAction={backButtonAction} />
          </ListItemIcon>
          <ListItemText>{children}</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export default PageBanner;
