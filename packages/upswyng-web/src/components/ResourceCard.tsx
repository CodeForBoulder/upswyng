import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Image from "material-ui-image";
import React from "react";
import { ResourceSchedule } from "@upswyng/upswyng-core";
import { TResource } from "@upswyng/upswyng-types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import { colors } from "../App.styles";
import { getNextOpenText } from "../utils/schedule";
import makeStyles from "@material-ui/styles/makeStyles";
import { useHistory } from "react-router-dom";

interface StyleProps {
  backgroundColor: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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
  cardScheduleContainer: {
    background: theme.palette.common.black,
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
  resource: TResource;
}

const ResourceCard = ({ index = 1, placeholder, resource }: Props) => {
  const cardColor =
    typeof index === "number" && !(index % 2) ? cardColors[0] : cardColors[1];
  const classes = useStyles({
    backgroundColor: cardColor.placeholderBackgroundColor,
  });
  const history = useHistory();

  const { name, resourceId, schedule, streetViewImage } = resource;
  const resourceUrl = `/resource/${resourceId}`;
  const resourceScheduleId = `${resourceId}-schedule`;
  const parsedSchedule = ResourceSchedule.parse(schedule);
  const scheduleText = getNextOpenText(parsedSchedule);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    history.push(resourceUrl);
  };

  return (
    <Card>
      <CardActionArea
        aria-describedby={scheduleText ? resourceScheduleId : undefined}
        role="link"
        onClick={handleClick}
      >
        <CardMedia
          component={() =>
            streetViewImage ? (
              <Image
                alt=""
                aspectRatio={457 / 250}
                color={cardColor.placeholderBackgroundColor}
                src={streetViewImage}
              />
            ) : (
              <div className={classes.cardImagePlaceHolderContainer}>
                {placeholder &&
                  React.cloneElement(placeholder, {
                    color: cardColor.iconColor,
                  })}
              </div>
            )
          }
        />
        <CardContent>
          <Typography variant="subtitle1">{name}</Typography>
        </CardContent>
      </CardActionArea>
      {scheduleText && (
        <CardActions className={classes.cardScheduleContainer}>
          <Typography id={resourceScheduleId} variant="subtitle2">
            {scheduleText}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default ResourceCard;
