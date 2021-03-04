import Container from "@material-ui/core/Container";
import HotlineCard from "./HotlineCard";
import List from "@material-ui/core/List";
import PageBanner from "./PageBanner";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";
import { useTranslation } from "react-i18next";

export const hotlineList = [
  {
    name: "nationalSuicidePreventionLifeline.name",
    description: "nationalSuicidePreventionLifeline.description",
    phone: "1-800-273-8255",
  },
  {
    name: "nationalDomesticViolenceHotline.name",
    description: "nationalDomesticViolenceHotline.description",
    phone: "1-800-799-7233",
  },
  {
    name: "veteransCrisisLine.name",
    description: "veteransCrisisLine.description",
    phone: "1-800-273-8255",
  },
  {
    name: "nationalChildAbuseHotline.name",
    description: "nationalChildAbuseHotline.description",
    phone: "1-800-422-4453",
  },
  {
    name: "nationalRunawaySafeline.name",
    description: "nationalRunawaySafeline.description",
    phone: "1-800-786-2929",
  },
  {
    name: "glbtNationalHotline.name",
    description: "glbtNationalHotline.description",
    phone: "1-800-843-4564",
  },
  {
    name: "nationalHumanTraffickingResourceCenter.name",
    description: "nationalHumanTraffickingResourceCenter.description",
    phone: "1-800-373-7888",
  },
  {
    name: "nationalSexualAssultHotline.name",
    description: "nationalSexualAssultHotline.description",
    phone: "1-800-656-4673",
  },
  {
    name: "transLifeline.name",
    description: "transLifeline.description",
    phone: "1-877-565-8860",
  },
  {
    name: "substanceAbuseAndMentalHealthServicesAdministration.name",
    description:
      "substanceAbuseAndMentalHealthServicesAdministration.description",
    phone: "1-800-662-4357",
  },
  {
    name: "nationalHotlineForCrimeVictims.name",
    description: "nationalHotlineForCrimeVictims.description",
    phone: "1-855-484-2846",
  },
  {
    name: "nationalDisasterDistressHelpline.name",
    description: "nationalDisasterDistressHelpline.description",
    phone: "1-855-484-2846",
  },
  {
    name: "unitedWay.name",
    description: "unitedWay.description",
    phone: "2-1-1",
  },
];

const Hotlines = () => {
  const { t } = useTranslation(["hotlines", "categories"]);
  return (
    <Container>
      <PageBanner color={colors.pink}>
        <Typography variant="h1">{t("categories:hotlines")}</Typography>
      </PageBanner>
      <List>
        {hotlineList.map(({ name, description, phone }) => (
          <HotlineCard
            key={name}
            name={t(name)}
            description={t(description)}
            phone={phone}
          />
        ))}
      </List>
    </Container>
  );
};

export default Hotlines;
