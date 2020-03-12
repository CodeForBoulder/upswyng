import Grid from "@material-ui/core/Grid";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

interface Props {
  numItems?: number;
}

const LoadingSearchResults = ({ numItems = 4 }: Props) => (
  <Grid container direction="column" spacing={2}>
    {Array(numItems)
      .fill(null)
      .map((_, i) => (
        <Grid item data-test="loading-item" key={i}>
          <Typography variant="h3" component="div" gutterBottom>
            <Skeleton animation="wave" variant="text" width="60%" />
          </Typography>
          <Typography paragraph>
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Typography>
        </Grid>
      ))}
  </Grid>
);

export default LoadingSearchResults;
