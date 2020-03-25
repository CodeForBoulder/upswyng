import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

interface Props {
  backButtonAction?: (() => void) | null;
}

const BackButton = ({ backButtonAction }: Props) => {
  const history = useHistory();

  return (
    <IconButton
      onClick={() =>
        backButtonAction ? backButtonAction() : history.push("/")
      }
      size="small"
    >
      <Typography variant="srOnly">go back to previous page</Typography>
      <ArrowBackIcon fontSize="large" />
    </IconButton>
  );
};

export default BackButton;
