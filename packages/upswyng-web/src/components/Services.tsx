import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TResource } from "@upswyng/upswyng-types";

interface Props {
  resource: TResource;
}

const Services = ({ resource }: Props) => {
  if (!resource?.services?.length) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {resource.services.map(service => (
        <Grid item key={service.trim()}>
          <Chip label={service.trim()} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Services;
