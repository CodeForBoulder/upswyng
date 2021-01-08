import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Snackbar from "@material-ui/core/Snackbar";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useLocalStorage from "./useLocalStorage";

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
  const [favoritedResources, setFavoritedResources] = useLocalStorage<string[]>(
    "favoritedResources"
  );
  const isFavoritedResource = favoritedResources?.includes(resourceId);
  const handleFabClick = () => {
    if (isFavoritedResource && favoritedResources) {
      setFavoritedResources(favoritedResources.filter(id => id !== resourceId));
    } else {
      if (!favoritedResources) {
        setSnackbarShowing(true);
      }
      setFavoritedResources((favoritedResources || []).concat(resourceId));
    }
  };

  return (
    <div>
      <Fab
        onClick={handleFabClick}
        color="primary"
        className={classes.fab}
        aria-label="add"
      >
        {isFavoritedResource ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Fab>
      <Snackbar
        autoHideDuration={5000}
        open={snackbarShowing}
        onClose={() => setSnackbarShowing(false)}
        className={classes.snackbar}
      >
        <Alert severity="info">Favorites are only saved to this device.</Alert>
      </Snackbar>
    </div>
  );
};

export default FavoriteResourceFAB;
