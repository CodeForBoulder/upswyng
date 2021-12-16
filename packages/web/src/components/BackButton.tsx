import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  backButtonAction?: (() => void) | null;
}

const BackButton = ({ backButtonAction }: Props) => {
  const { t } = useTranslation("glossary");
  const history = useHistory();

  return (
    <Box ml={2}>
      <IconButton
        onClick={() =>
          backButtonAction ? backButtonAction() : history.push("/")
        }
        size="small"
      >
        <Typography variant="srOnly">{t("backToPrevious")}</Typography>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default BackButton;
