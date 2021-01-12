import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import PageBanner from "./PageBanner";
import React from "react";
import ResourceList from "./ResourceList";
import { TResource } from "@upswyng/types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useLocalStorage from "./useLocalStorage";
import useResource from "./useResource";

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
}));

export const FavoriteResources = () => {
  const classes = useStyles();
  const [favoritedResources] = useLocalStorage<string[]>("favoritedResources");

  const resources: TResource[] | null | undefined = useResource(
    favoritedResources || []
  );
  let status: "loading" | "error" | "success" = "success";
  if (resources === undefined) {
    status = "loading";
  } else if (resources === null) {
    status = "error";
  }

  const renderBodyContent = () => {
    if (favoritedResources === null || favoritedResources.length === 0) {
      return <Typography>You haven&apos;t added any favorites yet!</Typography>;
    } else {
      return (
        <ResourceList resources={resources || undefined} status={status} />
      );
    }
  };

  return (
    <Container>
      <PageBanner color={colors.orangePrimary}>
        <Typography variant="h1">{"Favorites"}</Typography>
      </PageBanner>
      <Alert severity="info" className={classes.alert}>
        Favorites are only saved to this device. They will not be saved if you
        are using a public computer, or when you have a private session enabled
        in your browser (incognito mode).
      </Alert>
      {renderBodyContent()}
    </Container>
  );
};

export default FavoriteResources;
