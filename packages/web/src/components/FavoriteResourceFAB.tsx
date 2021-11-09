import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Snackbar from "@material-ui/core/Snackbar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useLocalStorage from "./useLocalStorage";
import { useTranslation } from "react-i18next";

interface Props {
  resourceId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90,
    },
  },
}));

export const FavoriteResourceFAB = ({ resourceId }: Props) => {
  const classes = useStyles();
  const [snackbarShowing, setSnackbarShowing] = useState(false);
  const [favoriteResources, setFavoriteResources] = useLocalStorage<string[]>(
    "favoriteResources"
  );
  const { t } = useTranslation("favorites");
  const isFavoriteResource = favoriteResources?.includes(resourceId);
  const handleFabClick = () => {
    if (isFavoriteResource && favoriteResources) {
      // Remove from favorites
      setFavoriteResources(favoriteResources.filter(id => id !== resourceId));
    } else {
      // Add to favorites

      // Only show the alert if this is their first time favoriting
      if (!favoriteResources) {
        setSnackbarShowing(true);
      }

      setFavoriteResources((favoriteResources || []).concat(resourceId));
    }
  };

  return (
    <>
      <Fab
        onClick={handleFabClick}
        color="primary"
        className={classes.fab}
        aria-label={t("addToFavorites")}
      >
        {isFavoriteResource ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Fab>
      <Snackbar
        autoHideDuration={5000}
        open={snackbarShowing}
        onClose={() => setSnackbarShowing(false)}
        className={classes.snackbar}
      >
        <Alert severity="info">{t("favoritesOnDevice")}</Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteResourceFAB;
