import { colors, font } from "../App.styles";

import Image from "material-ui-image";
import { Link } from "react-router-dom";
import React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/styles/makeStyles";

interface StyleProps {
  backgroundColor: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    borderRadius: "6px",
    color: theme.palette.common.white,
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    overflow: "hidden",
    "&:link,&:visited": {
      textDecoration: "none",
    },
    "&:hover,&:active": {
      textDecoration: "none",
      "& > *:first-child": {
        textDecoration: "underline",
      },
    },
  },
  cardImageContainer: {
    position: "relative",
    flex: "1 1 auto",
  },
  cardImagePlaceHolderContainer: (styleProps: StyleProps) => ({
    background: styleProps.backgroundColor,
    position: "relative",
    "&::before": {
      content: '""',
      display: "block",
      paddingBottom: `${(250 / 457) * 100}%`,
      width: "100%",
    },
    "&& > *": {
      height: "80%",
      left: "10%",
      position: "absolute",
      opacity: 0.5,
      top: "10%",
      width: "80%",
    },
  }),
  cardResourceName: {
    bottom: 4,
    color: theme.palette.common.white,
    display: "flex",
    flexDirection: "column",
    fontSize: font.helpers.convertPixelsToRems(14),
    fontWeight: 700,
    padding: "0 8px 8px",
    position: "absolute",
    width: "100%",
    textDecoration: "inherit",
    textShadow: `0 3px 6px ${theme.palette.common.black}`,
  },
  cardFooter: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "row",
  },
  cardScheduleContainer: {
    alignItems: "center",
    background: theme.palette.common.black,
    display: "flex",
    flex: "1 1 auto",
    fontSize: font.helpers.convertPixelsToRems(12),
    fontWeight: 600,
    textDecoration: "none",
    padding: "6px 8px",
  },
}));

interface TCardColor {
  iconColor: string;
  placeholderBackgroundColor: string;
}

const cardColors: TCardColor[] = [
  {
    iconColor: colors.greyMedium,
    placeholderBackgroundColor: colors.greyLight,
  },
  {
    iconColor: colors.greyLight,
    placeholderBackgroundColor: colors.greyMedium,
  },
];

interface Props {
  index?: number;
  placeholder?: React.ReactElement;
  resourceId: string;
  resourceImage: string | null;
  resourceName: string;
  scheduleText?: string;
}

const ResourceCard = ({
  index = 1,
  placeholder,
  resourceId,
  resourceName,
  scheduleText,
  resourceImage,
}: Props) => {
  const cardColor =
    typeof index === "number" && !(index % 2) ? cardColors[0] : cardColors[1];
  const classes = useStyles({
    backgroundColor: cardColor.placeholderBackgroundColor,
  });

  return (
    <Link
      className={classes.cardContainer}
      to={{
        pathname: `/resource/${resourceId}`,
      }}
    >
      <div className={classes.cardImageContainer}>
        {resourceImage && (
          <Image
            aspectRatio={457 / 250}
            color={cardColor.placeholderBackgroundColor}
            src={resourceImage}
            alt=""
          />
        )}
        {!resourceImage && (
          <div className={classes.cardImagePlaceHolderContainer}>
            {placeholder &&
              React.cloneElement(placeholder, {
                color: cardColor.iconColor,
              })}
          </div>
        )}
        <span className={classes.cardResourceName}>{resourceName}</span>
      </div>
      {scheduleText && (
        <span className={classes.cardFooter}>
          <span className={classes.cardScheduleContainer}>{scheduleText}</span>
        </span>
      )}
    </Link>
  );
};

export default ResourceCard;
