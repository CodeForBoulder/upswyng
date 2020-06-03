import Container from "@material-ui/core/Container";
import MuiLink from "@material-ui/core/Link";
import PageBanner from "./PageBanner";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { colors } from "../App.styles";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
  lowerAlphaList: {
    listStyleType: "lower-alpha",
  },
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <Container>
      <PageBanner color={colors.orangeDark} text={"Privacy Policy"} />
      <Typography paragraph>
        UpSwyng has created this Privacy Policy to explain why we collect
        particular information and how we will protect your personal privacy
        within our Web site. This Privacy Policy discloses our information
        gathering and dissemination practices for the Web site located at the
        URL{" "}
        <MuiLink component={RouterLink} to="/">
          https://upswyng.org
        </MuiLink>{" "}
        (the “Site”).
      </Typography>
      <Typography paragraph>
        In order to fully understand your rights we encourage you to read this
        Privacy Policy as well as our{" "}
        <MuiLink component={RouterLink} to="/terms-of-use">
          Terms of Use
        </MuiLink>
        . This Privacy Policy is incorporated by reference into and is subject
        to our{" "}
        <MuiLink component={RouterLink} to="/terms-of-use">
          Terms of Use
        </MuiLink>
        . upswyng.org reserves the right at any time and without notice to
        change this Privacy Policy simply by posting such changes on our Site.
        Any such change will be effective immediately upon posting.
      </Typography>
      <Typography paragraph>
        Because we want to demonstrate our commitment to your privacy, this
        Privacy Policy notifies you of:
      </Typography>
      <Typography component="ol" paragraph>
        <Typography component="li" gutterBottom>
          What personally identifiable information of yours is collected through
          the Site;
        </Typography>
        <Typography component="li" gutterBottom>
          Who collects such information;
        </Typography>
        <Typography component="li" gutterBottom>
          How such information is used;
        </Typography>
        <Typography component="li" gutterBottom>
          With whom your information may be shared; and
        </Typography>
        <Typography component="li">
          How you can correct any inaccuracies in your information.
        </Typography>
      </Typography>
      <Typography paragraph>
        Questions regarding this statement should be directed to the UpSwyng.org
        by sending an email{" "}
        <MuiLink href="mailto:info@upswyng.org">info@upswyng.org</MuiLink>.
        Please reference this Privacy Policy in your subject line.
      </Typography>
      <Typography variant="h2" gutterBottom>
        What Information We Collect and How We Use That Information
      </Typography>
      <Typography paragraph>
        When you download, register with, or use UpSwyng.org or its mobile
        application version we may ask you to provide information:
      </Typography>
      <Typography component="ol" paragraph>
        <Typography component="li" gutterBottom>
          By which you may be personally identified, such as name, postal
          address if applicable, email address, telephone number, or age
          (“personal information”);
        </Typography>
        <Typography component="li" gutterBottom>
          Information that you provide by filling in forms in the App or
          Website;
        </Typography>
        <Typography component="li" gutterBottom>
          Records and copies of your correspondence with service providers or
          the us;
        </Typography>
        <Typography component="li" gutterBottom>
          Your search queries on the App or Website;
        </Typography>
        <Typography component="li">
          Real-time information about the location of your device (collectively
          “User Contributions”).
        </Typography>
      </Typography>
      <Typography paragraph>
        Your User Contributions are transmitted at your own risk. Please be
        aware that no security measures are perfect or impenetrable.
        Additionally, we cannot control the actions of third parties with whom
        you may choose to share your User Contributions. Therefore, we cannot
        and do not guarantee that your User Contributions will not be viewed by
        unauthorized persons.
      </Typography>
      <Typography paragraph>
        You may optionally upload photographs of service provider facilities or
        other related subjects to the Site. By uploading or emailing a
        photograph to the Site, you confirm that:
      </Typography>
      <Typography component="ol" paragraph>
        <Typography component="li" gutterBottom>
          You are authorized to provide the photograph to UpSwyng.org;
        </Typography>
        <Typography component="li" gutterBottom>
          Any/all people appearing in the photograph have provided you with
          explicit approval to be photographed and for the photograph to be
          uploaded to the Site; and
        </Typography>
        <Typography component="li" gutterBottom>
          You and anyone appearing the photograph explicitly agree to:
          <Typography
            className={classes.lowerAlphaList}
            component="ol"
            paragraph
          >
            <Typography component="li" gutterBottom>
              Having the photograph appear on the Site;
            </Typography>
            <Typography component="li" gutterBottom>
              Allowing the photograph to be used by UpSwyng.org for
              informational or educational purposes which may include appearing
              in mass media, video, presentations, printed material or emails on
              our Site;
            </Typography>
            <Typography component="li" gutterBottom>
              The use of the photograph by UpSwyng.org for informational,
              educational or promotional purposes does not entitle you or anyone
              else to any prior notice, compensation or other remedies; and
            </Typography>
            <Typography component="li" gutterBottom>
              Not have any personally identifying information (such as a name of
              an individual) appear in the photograph.
            </Typography>
          </Typography>
        </Typography>
      </Typography>
      <Typography paragraph>
        UpSwyng.org will not publish or otherwise distribute your name or other
        personally identifying information (or that of others appearing in the
        textual, image or video) without your prior explicit consent. Instead,
        UpSwyng.org may elect to use your initials and city/state if needed. We
        do not collect or store sensitive information such as credit card or
        social security numbers.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Use of “Cookies”
      </Typography>
      <Typography paragraph>
        Cookies are pieces of information that some web sites transfer to the
        computer that is browsing that web site and are used for record-keeping
        purposes at many web sites. UpSwyng does not use cookies.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Disclosure
      </Typography>
      <Typography paragraph>
        We may disclose personally identifiable information in response to legal
        process for example, in response to a court order or a subpoena. We also
        may disclose such information in response to a law enforcement agency’s
        request or where we believe it necessary to investigate, prevent or take
        action regarding illegal activities, suspected fraud, situations
        involving potential threats to the physical safety of any person,
        violations of our Terms of Use, or as otherwise required by law. Agents
        and contractors of UpSwyng.org who have access to personally
        identifiable information are required to protect this information in a
        manner that is consistent with this Privacy Policy by, for example, not
        using the information for any purpose other than to carry out the
        services they are performing for UpSwyng.org. Although we take
        appropriate measures to safeguard against unauthorized disclosures of
        information, we cannot assure you that personally identifiable
        information that we collect will never be disclosed in a manner that is
        inconsistent with this Privacy Policy.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Correcting Information
      </Typography>
      <Typography paragraph>
        Upon request, we will provide you with access to the information we
        maintain about you, including contact information. You may correct and
        update this information by providing us with the correct information.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Other Web Sites
      </Typography>
      <Typography paragraph>
        Our Site contains links to other web sites. Please note that when you
        click on one of these links, you are entering another web site for which
        UpSwyng.org has no responsibility. We encourage you to read the privacy
        statements on all such sites as their policies may be different than
        ours. We have no control over information that is submitted to, or
        collected by, these third parties.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Children’s Online Privacy Protection
      </Typography>
      <Typography paragraph>
        UpSwyng.org is not intended for children under 13 years of age. No one
        under the age 13 may provide any personal information to the Website or
        application. We do not knowingly collect personal information from
        children under 13. If you are under 13, do not use or provide any
        information on this Website or application. If we learn we have
        collected or received personal information from a child under 13 without
        verification of parental consent, we will delete that information. If
        you believe we might have any information from or about a child under
        13, please contact us at{" "}
        <MuiLink href="mailto:info@upswyng.org">info@upswyng.org</MuiLink>.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Consent; Changes to Privacy Policy
      </Typography>
      <Typography paragraph>
        By using the Site, you consent to the collection, use, and storage of
        your information by us in the manner described in this Privacy Policy
        and elsewhere on the Site. We reserve the right to make changes to this
        Privacy Policy from time to time. We will alert you to any material
        changes by sending a notice to the e-mail address you provided to us or
        updating this Privacy Policy. This Privacy Policy was last updated on
        May 18, 2020.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Contacting the Web Site:
      </Typography>
      <Typography paragraph>
        If you have any questions about this Privacy Policy, the practices of
        this Site, or your dealings with this Site, you can contact:{" "}
        <MuiLink href="mailto:info@upswyng.org">info@upswyng.org</MuiLink>.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
