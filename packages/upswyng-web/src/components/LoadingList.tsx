import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

interface LoadingResultsProps {
  numItems?: number;
}

const LoadingList = ({ numItems = 4 }: LoadingResultsProps) => (
  <List>
    {Array(numItems)
      .fill(null)
      .map((_, i) => (
        <ListItem key={i}>
          <ListItemText
            primary={<Skeleton animation="wave" variant="text" width="45%" />}
            secondary={
              <>
                <Skeleton animation="wave" variant="text" />
                <Skeleton animation="wave" variant="text" />
              </>
            }
          />
        </ListItem>
      ))}
  </List>
);

export default LoadingList;
