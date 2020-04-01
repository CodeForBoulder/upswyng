import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Image from "material-ui-image";
import React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import { colors } from "../App.styles";
import makeStyles from "@material-ui/styles/makeStyles";
import { useHistory } from "react-router-dom";

interface StyleProps {
  backgroundColor: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "100%",
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
  const history = useHistory();
  const resourceUrl = `/resource/${resourceId}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    history.push(resourceUrl);
  };

  return (
    <Card className={classes.card} raised>
      <CardActionArea role="link" onClick={handleClick}>
        <CardMedia
          component={() =>
            resourceImage ? (
              <Image
                alt=""
                aspectRatio={457 / 250}
                color={cardColor.placeholderBackgroundColor}
                src={resourceImage}
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
          <Typography variant="subtitle1">{resourceName}</Typography>
        </CardContent>
        {scheduleText && (
          <CardActions className={classes.cardScheduleContainer}>
            <Typography variant="subtitle2">{scheduleText}</Typography>
          </CardActions>
        )}
      </CardActionArea>
    </Card>
  );
};

export default ResourceCard;
