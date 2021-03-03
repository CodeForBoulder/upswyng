import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import LoadingSpinner from "./LoadingSpinner";
import PageBanner from "./PageBanner";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useLastLocation } from "react-router-last-location";
import useResources from "./useResources";
import { useTranslation } from "react-i18next";

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
  const resource = useResources([resourceId]).data?.[0];
  const history = useHistory();
  const lastLocation = useLastLocation();
  const classes = useStyles();
  const { t } = useTranslation(["reportIssue", "glossary"]);
  const [comments, setComments] = React.useState("");
  const [submissionError, setError] = React.useState("");
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [issues, updateIssues] = React.useState({
    address: {
      text: t("address"),
      checked: false,
    },
    phone: {
      text: t("phone"),
      checked: false,
    },
    website: {
      text: t("website"),
      checked: false,
    },
    schedule: {
      text: t("schedule"),
      checked: false,
    },
    directions: {
      text: t("directions"),
      checked: false,
    },
  } as State);

  const selectedIssues = (): string => {
    const selected: string[] = [];
    Object.keys(issues).forEach(issue => {
      if (issues[issue].checked) {
        selected.push(issues[issue].text);
      }
    });
    return JSON.stringify(selected);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // checking for empty stringified array
    if (selectedIssues().length < 4 && !comments) {
      setError(t("noFeedbackSubmitted"));
    } else {
      axios
        .post(`${serverUri}/api/resources/issues/user-report`, {
          resourceId: resourceId,
          detailExplanation: comments,
          reportedIssues: selectedIssues(),
        })
        .then(() => setFormSubmitted(true))
        .catch(() => setError(t("problemSendingFeedback")));
    }
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
      <PageBanner backButtonAction={lastLocation ? history.goBack : null}>
        <Typography variant="h1">{t("title")}</Typography>
      </PageBanner>
      <Typography component="div">{t("reportFor")}</Typography>
      <Typography variant="h2" color="primary">
        {resource?.name}
      </Typography>
      {formSubmitted ? (
        <>
          <Typography color="secondary" className={classes.marginTop}>
            {t("submissionSuccess")}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={history.goBack}
            className={classes.marginTop}
            size="medium"
          >
            {t("glossary:back")}
          </Button>
        </>
      ) : (
        <>
          <form onSubmit={e => handleSubmit(e)}>
            <FormGroup className={classes.marginTop}>
              {Object.keys(issues).map((issue: string) => {
                const { text, checked } = issues[issue];
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCheck(issue)}
                      />
                    }
                    label={text}
                    key={text}
                  />
                );
              })}
            </FormGroup>
            <TextField
              multiline
              fullWidth
              className={classes.marginTop}
              label={t("glossary:comments")}
              variant="outlined"
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.marginTop}
              size="medium"
            >
              {t("glossary:send")}
            </Button>
          </form>
          <Typography hidden={!submissionError} color="primary">
            {submissionError}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default ReportIssue;
