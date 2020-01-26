import Card from "@material-ui/core/Card";
import { Container } from "../App.styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";

const CoordinatedEntry = () => (
  <Container>
    <Typography variant="h1" gutterBottom>
      Coordinated Entry
    </Typography>

    <Typography paragraph>
      All single homeless adults must go through the Coordinated Entry process
      to receive services from Boulder County or the cities of Boulder or
      Longmont. After meeting with a staff person and going through a short
      screening, clients will be referred to the most appropriate service
      depending on their needs.
    </Typography>
    <Card elevation={1} variant="outlined" square>
      <List>
        <ListItem>
          <ListItemIcon>
            <WarningIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <Typography>
              Note you must have been in Boulder County for 6 months before
              applying. If you apply before 6 months, you will be barred from
              any services.
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  </Container>
);

export default CoordinatedEntry;
