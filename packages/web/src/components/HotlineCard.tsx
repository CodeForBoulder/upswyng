import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  description: string;
  phone: string;
}

const HotlineCard = ({ name, description, phone }: Props) => {
  const [hideText, setHideText] = React.useState(true);
  const { t } = useTranslation(["glossary"]);
  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={
          <>
            <Link
              underline="always"
              href={`tel:${phone.replace(/[-]/g, "")}`}
              color="secondary"
            >
              {phone}
            </Link>
            <Button
              onClick={() => setHideText(!hideText)}
              size="small"
              color="secondary"
              style={{ float: "right" }}
            >
              {hideText ? t("more") : t("less")}
            </Button>
            <Typography noWrap={hideText}>{description}</Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default HotlineCard;
