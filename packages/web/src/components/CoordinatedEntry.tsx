import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PageBanner from "./PageBanner";
import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import { colors } from "@upswyng/common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTranslation } from "react-i18next";

const useButtonStyles = makeStyles({
  contained: {
    "&, &:hover": {
      background: colors.rosewood,
      color: colors.white,
    },
  },
});

const CoordinatedEntry = () => {
  const buttonClasses = useButtonStyles({});
  const { t } = useTranslation(["coordinatedEntry", "glossary"]);

  return (
    <Container>
      <PageBanner color={colors.rosewood}>
        <Typography variant="h1">{t("glossary:coordinatedEntry")}</Typography>
      </PageBanner>
      <Typography paragraph>{t("mainNotice")}</Typography>
      <Card variant="outlined" square>
        <List>
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <ListItemText>
              <Typography paragraph>{t("qualifyingNotice")}</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Card>
      <Button
        classes={buttonClasses}
        fullWidth
        href="https://www.bouldercounty.org/homeless/"
        rel="noopener noreferrer"
        startIcon={<ExitToAppIcon />}
        size="large"
        target="_blank"
        variant="contained"
      >
        {t("glossary:coordinatedEntry")}
      </Button>
    </Container>
  );
};

export default CoordinatedEntry;
