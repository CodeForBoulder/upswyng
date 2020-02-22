import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Typography from "@material-ui/core/Typography";

const initiatePhoneCall = (phoneNumber: string): void => {
  window.open(`tel:${phoneNumber}`);
};

interface Props {
  name: string;
  description: string;
  phone: string;
}

const HotlineCard = ({ name, description, phone }: Props) => {
  const [hideText, setHideText] = React.useState(true);
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
        {hideText ? "More" : "Less"}
      </Button>
    </ListItem>
  );
};

export default HotlineCard;
