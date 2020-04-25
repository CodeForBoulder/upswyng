import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";

const initiatePhoneCall = (phoneNumber: string): void => {
  window.open(`tel:${phoneNumber.replace(/[-]/g, "")}`);
};

interface Props {
  name: string;
  description: string;
  phone: string;
}

const HotlineCard = ({ name, description, phone }: Props) => {
  const [hideText, setHideText] = React.useState(true);
  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={
          <>
            <Link
              underline="always"
              onClick={() => initiatePhoneCall(phone)}
              color="secondary"
              style={{ cursor: "pointer" }}
            >
              {phone}
            </Link>
            <Button
              onClick={() => setHideText(!hideText)}
              size="small"
              color="secondary"
              style={{ float: "right" }}
            >
              {hideText ? "More" : "Less"}
            </Button>
            <Typography noWrap={hideText}>{description}</Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default HotlineCard;
