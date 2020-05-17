import { getIsOpen, getNextOpenText } from "../utils/schedule";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import React from "react";
import { ResourceSchedule } from "@upswyng/common";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { TResource } from "@upswyng/types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { useHistory } from "react-router-dom";

interface StyleProps {
  index: number;
  isOpen: boolean | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  cardImagePlaceHolderContainer: (styleProps: StyleProps) => ({
    background:
      styleProps.index % 2 ? theme.palette.grey.A200 : theme.palette.grey[600],
    color:
      styleProps.index % 2 ? theme.palette.grey[600] : theme.palette.grey.A200,
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
  cardScheduleText: (styleProps: StyleProps) => ({
    color: styleProps.isOpen
      ? theme.palette.success.main
      : theme.palette.error.main,
  }),
}));

interface Props {
  index?: number;
  placeholder?: React.ReactElement;
  resource: TResource;
}

const ResourceCard = ({ index = 1, placeholder, resource }: Props) => {
  const { name, resourceId, schedule, streetViewImage } = resource;

  const parsedSchedule = ResourceSchedule.parse(schedule);
  const isOpen = getIsOpen(parsedSchedule);
  const scheduleText = getNextOpenText(parsedSchedule);
  const classes = useStyles({
    index,
    isOpen,
  });
  const history = useHistory();

  const resourceUrl = `/resource/${resourceId}`;
  const resourceScheduleId = `${resourceId}-schedule`;

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
        <CardMedia>
          {streetViewImage ? (
            <Image
              alt=""
              aspectRatio={457 / 250}
              color="transparent"
              src={streetViewImage}
            />
          ) : (
            <div className={classes.cardImagePlaceHolderContainer}>
              {placeholder &&
                React.cloneElement(placeholder, {
                  color: "inherit",
                })}
            </div>
          )}
        </CardMedia>
        <CardContent>
          <Typography variant="subtitle1">{name}</Typography>
        </CardContent>
      </CardActionArea>
      {typeof isOpen === "boolean" && scheduleText && (
        <CardActions className={classes.cardScheduleContainer}>
          <Grid container direction="column" spacing={1}>
            <Grid
              alignItems="center"
              className={classes.cardScheduleText}
              container
              component={Typography}
              id={resourceScheduleId}
              item
              spacing={2}
              wrap="nowrap"
              variant="subtitle1"
            >
              <Grid item>
                <Grid alignContent="center" container>
                  <ScheduleIcon color="inherit" fontSize="inherit" />
                </Grid>
              </Grid>
              <Grid item>{isOpen ? "Open" : "Closed"}</Grid>
            </Grid>
            <Grid
              component={Typography}
              id={resourceScheduleId}
              item
              variant="subtitle2"
            >
              {scheduleText}
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};

export default ResourceCard;
