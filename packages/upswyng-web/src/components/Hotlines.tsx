import { Container, colors } from "../App.styles";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

import PageBanner from "./PageBanner";
import React from "react";

const initiatePhoneCall = (phoneNumber: string): void => {
  window.open(`tel:${phoneNumber}`);
};

const hotlineList = [
  {
    name: "National Suicide Prevention Lifeline",
    description: "",
    //"The National Suicide Prevention Lifeline provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week, across the United States. The Lifeline is comprised of a national network of over 160 local crisis centers, combining custom local care and resources with national standards and best practices.",
    phone: "1-800-273-8255",
  },
  {
    name: "National Domestic Violence Hotline",
    description:
      "Operating around the clock, seven days a week, confidential and free of cost, the National Domestic Violence Hotline provides lifesaving tools and immediate support to enable victims to find safety and live lives free of abuse. Callers to The Hotline at 1-800-799-SAFE (7233) can expect highly trained, experienced advocates to offer compassionate support, crisis intervention information and referral services in over 170 languages. Our phone and chat services are available to anyone who has been affected by relationship abuse, including those who are currently in abusive relationships, those who are working to heal, friends or family of victims and survivors and anyone in the community who has questions about domestic violence.",
    phone: "1-800-799-7233",
  },
  {
    name: "Veterans Crisis Line",
    description: "",
    //"The Veterans Crisis Line connects Veterans in crisis and their families and friends with qualified, caring Department of Veterans Affairs responders through a confidential toll-free hotline, online chat, or text.  Veterans and their loved ones can call 1-800-273-8255 and Press 1, chat online, or send a text message to 838255 to receive confidential support 24 hours a day, 7 days a week, 365 days a year. Support for deaf and hard of hearing individuals is available.",
    phone: "1-800-273-8255",
  },
  {
    name: "National Child Abuse Hotline",
    description: "",
    //"The Childhelp National Child Abuse Hotline 1-800-4-A-CHILD (1-800-422-4453) is dedicated to the prevention of child abuse. Serving the United States, its territories, and Canada, the hotline is staffed 24 hours a day, 7 days a week with professional crisis counselors who, through interpreters, can provide assistance in over 170 languages. The hotline offers crisis intervention, information, literature, and referrals to thousands of emergency, social service, and support resources. All calls are confidential.",
    phone: "1-800-422-4453",
  },
  {
    name: "National Runaway Safeline",
    description: "",
    //"For Youth &amp; Teens, The National Runaway Safeline (NRS) is here to listen whether you are thinking of running away or already have. Our services are confidential and nonjudgmental. For Parents &amp;  Guardians, NRS can offer you support and help connect you to the right resources for your family. Whether you’re having trouble talking to your child or your child has already run, we can help. We will listen and assist you in developing a plan",
    phone: "1-800-786-2929",
  },
  {
    name: "GLBT National Hotline",
    description: "",
    phone: "1-800-843-4564",
  },
  {
    name: "National Human Trafficking Resource Center",
    description: "",
    phone: "1-800-373-7888",
  },
  {
    name: "National Sexual Assult Hotline",
    description: "",
    phone: "1-800-656-4673",
  },
  {
    name: "Trans Lifeline",
    description: "",
    phone: "1-877-565-8860",
  },
  {
    name: "Substance Abuse and Mental Health Services Administration",
    description: "",
    phone: "1-800-662-4357",
  },
  {
    name: "National Hotline for Crime Victims",
    description: "",
    phone: "1-855-484-2846",
  },
  {
    name: "United Way",
    description: "",
    phone: "2-1-1",
  },
];

const hotlineCards = () =>
  hotlineList.map((hotline, i) => (
    <ListItem button key={i} onClick={() => initiatePhoneCall(hotline.phone)}>
      <ListItemText
        primary={hotline.name}
        secondary={
          <>
            <Typography>{hotline.phone}</Typography>
            {hotline.description}
          </>
        }
      />
    </ListItem>
  ));

const Hotlines = () => (
  <Container>
    <PageBanner color={colors.pink} text={"Hotlines"} />
    <List>{hotlineCards()}</List>
  </Container>
);

export default Hotlines;
