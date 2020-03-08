import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  TextField,
  Typography,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

import { Container } from "../App.styles";
import LoadingSpinner from "./LoadingSpinner";
import PageBanner from "./PageBanner";
import React from "react";
import axios from "axios";
import { useLastLocation } from "react-router-last-location";
import useResource from "./useResource";

interface State {
  [index: string]: {
    text: string;
    checked: boolean;
  };
}

let serverUri = process.env.REACT_APP_SERVER_URI || "http://localhost:3000";
if (serverUri.charAt(serverUri.length - 1) === "/") {
  serverUri = serverUri.slice(0, -1);
}

const useStyles = makeStyles(() =>
  createStyles({
    marginTop: {
      marginTop: "2rem",
    },
  })
);

const ReportIssue = () => {
  const { resourceId } = useParams();
  const resource = useResource(resourceId || "");
  const history = useHistory();
  const lastLocation = useLastLocation();
  const classes = useStyles();
  const [other, setOther] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [submissionError, setError] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [issues, updateIssues] = React.useState({
    address: {
      text: "The address is wrong.",
      checked: false,
    },
    phone: {
      text: "The phone number is wrong.",
      checked: false,
    },
    website: {
      text: "The website link is wrong.",
      checked: false,
    },
    schedule: {
      text: "The schedule is wrong.",
      checked: false,
    },
    directions: {
      text: "The directions are wrong.",
      checked: false,
    },
    other: {
      text: "Other",
      checked: false,
    },
  } as State);

  const selectedIssues = (): string => {
    const selected: string[] = [];
    Object.keys(issues).forEach(issue => {
      if (issues[issue].checked) {
        selected.push(issues[issue].text);
      }
      if (selected.includes("Other")) {
        selected.pop();
        if (other) {
          selected.push(other);
        }
      }
    });
    return JSON.stringify(selected);
  };

  const handleSubmit = () => {
    axios
      .post(`${serverUri}/api/resources/issues/user-report`, {
        resourceId: resourceId,
        detailExplanation: comments,
        reportedIssues: selectedIssues(),
      })
      .then(() => setFormSubmitted(true))
      .catch(() => setError(true));
  };

  const handleCheck = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateIssues({
      ...issues,
      [key]: { ...issues[key], checked: event.target.checked },
    });
  };

  if (resource === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <PageBanner
        text="Report an Issue"
        backButtonAction={lastLocation ? history.goBack : null}
      />
      <Typography component="div">
        Report an issue for:{" "}
        <Typography color="primary">{resource?.name}</Typography>
      </Typography>
      {formSubmitted ? (
        <>
          <Typography color="secondary" className={classes.marginTop}>
            The problem has been submitted and will be reviewed. Thank you for
            your feedback!
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={history.goBack}
            className={classes.marginTop}
            size="medium"
          >
            Back
          </Button>
        </>
      ) : (
        <>
          <FormGroup className={classes.marginTop}>
            {Object.keys(issues).map((issue: string) => {
              const { text, checked } = issues[issue];
              return (
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleCheck(issue)} />
                  }
                  label={text}
                  key={text}
                />
              );
            })}
            <Input
              disabled={!issues.other.checked}
              value={issues.other.checked ? other : ""}
              placeholder="Explain..."
              onChange={e => setOther(e.target.value)}
            />
          </FormGroup>
          <TextField
            multiline
            fullWidth
            className={classes.marginTop}
            label="Comments"
            variant="outlined"
            value={comments}
            onChange={e => setComments(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.marginTop}
            size="medium"
          >
            Send
          </Button>
          <Typography hidden={!submissionError} color="primary">
            There was a problem sending your feedback. Please try again.
          </Typography>
        </>
      )}
    </Container>
  );
};

export default ReportIssue;
