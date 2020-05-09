import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const LoadingSpinner = () => (
  <Box textAlign="center">
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
