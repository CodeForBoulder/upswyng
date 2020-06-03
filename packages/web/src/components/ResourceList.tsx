import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import ResourceCard from "./ResourceCard";
import { TResource } from "@upswyng/types";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
interface Props {
  placeholder?: React.ReactElement;
  resources?: TResource[];
  status: "loading" | "error" | "success";
}

const useStyles = makeStyles({
  list: {
    padding: 0,
  },
  listItem: {
    listStyleType: "none",
  },
});

const ResourceList = ({ placeholder, resources, status }: Props) => {
  const classes = useStyles();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "error" || !resources?.length) {
    return (
      <Typography>
        Whoops, it looks like we are having trouble on our end. Please try again
        in a bit.
      </Typography>
    );
  }

  const listItems = resources.map((resource, index) => {
    if (!resource.name || !resource.resourceId) {
      return null;
    }
    return (
      <Grid
        className={classes.listItem}
        component="li"
        item
        key={resource.resourceId}
        xs={6}
      >
        <ResourceCard
          index={index}
          placeholder={placeholder}
          resource={resource}
        />
      </Grid>
    );
  });
  return (
    <Grid
      alignItems="stretch"
      className={classes.list}
      component="ul"
      container
      spacing={3}
    >
      {listItems}
    </Grid>
  );
};

export default ResourceList;
