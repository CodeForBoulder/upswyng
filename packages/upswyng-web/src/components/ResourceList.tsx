import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import ResourceCard from "./ResourceCard";
import { TResource } from "@upswyng/upswyng-types";
import { font } from "../App.styles";
import { getNextOpenText } from "../utils/schedule";
import makeStyles from "@material-ui/styles/makeStyles";

interface Props {
  placeholder?: React.ReactElement;
  resources: undefined | null | TResource[];
}

const useStyles = makeStyles({
  list: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: `0 ${font.helpers.convertPixelsToRems(-8)}`,
    padding: 0,
    width: "auto",
  },
  listItem: {
    alignItems: "flex-start",
    display: "flex",
    flex: "0 1 50%",
    listStyleType: "none",
    padding: font.helpers.convertPixelsToRems(8),
  },
});

const ResourceList = ({ placeholder, resources }: Props) => {
  const classes = useStyles();
  if (resources === undefined) {
    return <LoadingSpinner />;
  }

  if (resources && resources.length) {
    const listItems = resources.map(
      ({ name, resourceId, schedule, streetViewImage }, index) => {
        if (!name || !resourceId) {
          return null;
        }
        const scheduleText = getNextOpenText(schedule);
        return (
          <li className={classes.listItem} key={resourceId}>
            <ResourceCard
              index={index}
              placeholder={placeholder}
              resourceId={resourceId}
              resourceImage={streetViewImage}
              resourceName={name}
              scheduleText={scheduleText}
            />
          </li>
        );
      }
    );
    return <ul className={classes.list}>{listItems}</ul>;
  }

  return (
    <>
      Whoops, it looks like we are having trouble on our end. Please try again
      in a bit.
    </>
  );
};

export default ResourceList;
