import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import PageBanner from "./PageBanner";
import React from "react";
import ResourceList from "./ResourceList";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useLocalStorage from "./useLocalStorage";
import useResources from "./useResources";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
}));

export const FavoriteResources = () => {
  const classes = useStyles();
  const { t } = useTranslation("alerts");
  const [favoriteResources] = useLocalStorage<string[]>("favoriteResources");

  const { data: resources, status } = useResources(favoriteResources || []);

  const renderBodyContent = () => {
    if (favoriteResources === null || favoriteResources.length === 0) {
      return <Typography>{t("noFavorites")}</Typography>;
    } else {
      return <ResourceList resources={resources} status={status} />;
    }
  };

  return (
    <Container>
      <PageBanner color={colors.orangePrimary}>
        <Typography variant="h1">{t("favorites")}</Typography>
      </PageBanner>
      <Alert severity="info" className={classes.alert}>
        {t("localOnly")}
      </Alert>
      {renderBodyContent()}
    </Container>
  );
};

export default FavoriteResources;
