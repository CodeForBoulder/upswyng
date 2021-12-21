import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
    <IconButton
      onClick={() =>
        backButtonAction ? backButtonAction() : history.push("/")
      }
      size="small"
      edge="start"
    >
      <Typography variant="srOnly">{t("backToPrevious")}</Typography>
      <ArrowBackIcon fontSize="large" />
    </IconButton>
  );
};

export default BackButton;
