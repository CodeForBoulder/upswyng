import { Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";

const initiatePhoneCall = (phoneNumber: string): void => {
  window.open(`tel:${phoneNumber}`);
};

interface Props {
  hotline: {
    name: string;
    description: string;
    phone: string;
  };
}

const HotlineCard = ({ hotline }: Props) => {
  const [hideText, setHideText] = React.useState(true);
  const { name, description, phone } = hotline;
  return (
    <ListItem button>
      <ListItemText
        onClick={() => initiatePhoneCall(phone)}
        primary={name}
        secondary={
          <>
            <Typography>{phone}</Typography>
            <Typography noWrap={hideText}>{description}</Typography>
          </>
        }
      />
      <Button
        onClick={() => setHideText(!hideText)}
        size="small"
        color="secondary"
      >
        {hideText ? "Show" : "Hide"}
      </Button>
    </ListItem>
  );
};

export default HotlineCard;
