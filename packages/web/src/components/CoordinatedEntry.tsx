import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PageBanner from "./PageBanner";
import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import { colors } from "@upswyng/common";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useButtonStyles = makeStyles({
  contained: {
    "&, &:hover": {
      background: colors.rosewood,
    },
  },
});

const CoordinatedEntry = () => {
  const buttonClasses = useButtonStyles({});
  return (
    <Container>
      <PageBanner color={colors.rosewood}>
        <Typography variant="h1">Coordinated Entry</Typography>
      </PageBanner>
      <Typography paragraph>
        All single homeless adults must go through the Coordinated Entry process
        to receive services from Boulder County or the cities of Boulder or
        Longmont. After meeting with a staff person and going through a short
        screening, clients will be referred to the most appropriate service
        depending on their needs.
      </Typography>
      <Card variant="outlined" square>
        <List>
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <ListItemText>
              <Typography paragraph>
                Note you must have been in Boulder County for 6 months before
                applying.
              </Typography>
              <Typography color="secondary">
                If you apply before 6 months, you will be barred from any
                services.
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Card>
      <Button
        classes={buttonClasses}
        fullWidth
        href="https://www.bouldercounty.org/homeless/"
        rel="noopener noreferrer"
        startIcon={<ExitToAppIcon />}
        size="large"
        target="_blank"
        variant="contained"
      >
        Coordinated Entry
      </Button>
    </Container>
  );
};

export default CoordinatedEntry;
