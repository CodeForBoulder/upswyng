import Container from "@material-ui/core/Container";
import HotlineCard from "./HotlineCard";
import List from "@material-ui/core/List";
import PageBanner from "./PageBanner";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { colors } from "@upswyng/common";

export const hotlineList = [
  {
    name: "National Suicide Prevention Lifeline",
    description:
      "The National Suicide Prevention Lifeline provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week, across the United States. The Lifeline is comprised of a national network of over 160 local crisis centers, combining custom local care and resources with national standards and best practices.",
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
    description:
      "The Veterans Crisis Line connects Veterans in crisis and their families and friends with qualified, caring Department of Veterans Affairs responders through a confidential toll-free hotline, online chat, or text.  Veterans and their loved ones can call 1-800-273-8255 and Press 1, chat online, or send a text message to 838255 to receive confidential support 24 hours a day, 7 days a week, 365 days a year. Support for deaf and hard of hearing individuals is available.",
    phone: "1-800-273-8255",
  },
  {
    name: "National Child Abuse Hotline",
    description:
      "The Childhelp National Child Abuse Hotline 1-800-4-A-CHILD (1-800-422-4453) is dedicated to the prevention of child abuse. Serving the United States, its territories, and Canada, the hotline is staffed 24 hours a day, 7 days a week with professional crisis counselors who, through interpreters, can provide assistance in over 170 languages. The hotline offers crisis intervention, information, literature, and referrals to thousands of emergency, social service, and support resources. All calls are confidential.",
    phone: "1-800-422-4453",
  },
  {
    name: "National Runaway Safeline",
    description:
      "For Youth and Teens, The National Runaway Safeline (NRS) is here to listen whether you are thinking of running away or already have. Our services are confidential and nonjudgmental. For Parents and Guardians, NRS can offer you support and help connect you to the right resources for your family. Whether you’re having trouble talking to your child or your child has already run, we can help. We will listen and assist you in developing a plan",
    phone: "1-800-786-2929",
  },
  {
    name: "GLBT National Hotline",
    description:
      "The Gay, Lesbian, Bisexual and Transgender (GLBT) National Hotline provides telephone, online private one-to-one chat and email peer-support, as well as factual information and local resources for cities and towns across the United States. All of our services are free and confidential. We speak with callers of all ages about coming-out issues, relationship concerns, bullying, workplace issues, HIV/AIDS anxiety and safer-sex information, and lots more! Utilizing a diverse group of GLBT volunteers, we operate two national hotlines, the GLBT National Hotline(1-888-843-4564) and the GLBT National Youth Talkline(1-800-246-7743), as well as private, volunteer one-to-one online chat, that helps both youth and adults.  Email: help@GLBThotline.org ",
    phone: "1-800-843-4564",
  },
  {
    name: "National Human Trafficking Resource Center",
    description:
      "The National Human Trafficking Resource Center (NHTRC) is a national anti-trafficking hotline and resource center serving victims and survivors of human trafficking and the anti-trafficking community in the United States. The toll-free hotline is available to answer calls from anywhere in the country, 24 hours a day, 7 days a week, every day of the year in more than 200 languages. The NHTRC can also be accessed by emailing nhtrc@polarisproject.org. Our mission is to provide human trafficking victims and survivors with access to critical support and services to get help and stay safe, and to equip the anti-trafficking community with the tools to effectively combat all forms of human trafficking. We offer round-the-clock access to a safe space to report tips, seek services, and ask for help. ",
    phone: "1-800-373-7888",
  },
  {
    name: "National Sexual Assult Hotline",
    description:
      "RAINN (Rape, Abuse and Incest National Network) is the nation's largest anti-sexual violence organization. RAINN created and operates the National Sexual Assault Hotline (800.656.HOPE, online.rainn.org y rainn.org/es) in partnership with more than 1,000 local sexual assault service providers across the country and operates the DoD Safe Helpline for the Department of Defense. RAINN also carries out programs to prevent sexual violence, help victims, and ensure that perpetrators are brought to justice.",
    phone: "1-800-656-4673",
  },
  {
    name: "Trans Lifeline",
    description:
      "This line is primarily for transgender people experiencing a crisis. This includes people who may be struggling with their gender identity and are not sure that they are transgender. While our goal is to prevent self harm, we welcome the call of any transgender person in need. We will do our very best to connect them with services that can help them meet that need. If you are not sure whether you should call or not, then please call us. Our hotline is staffed by the true experts on transgender experience, transgender people themselves. Our volunteers are all trans identified and educated in the range of difficulties transgender people experience. Our volunteers are dedicated to improving the lives of transgender people. Additionally, our operators will only call emergency services with your expressed consent.",
    phone: "1-877-565-8860",
  },
  {
    name: "Substance Abuse and Mental Health Services Administration",
    description:
      "SAMHSA’s National Helpline (also known as the Treatment Referral Routing Service) is a confidential, free, 24-hour-a-day, 365-day-a-year, information service, in English and Spanish, for individuals and family members facing mental and/or substance use disorders. This service provides referrals to local treatment facilities, support groups, and community-based organizations. Callers can also order free publications and other information.",
    phone: "1-800-662-4357",
  },
  {
    name: "National Hotline for Crime Victims",
    description:
      "The VictimConnect Resource Center is a place for crime victims to learn about their rights and options confidentially and compassionately. VictimConnect serves victims of any crime in the United States. Whether by chat or phone, our specialists assist victims in locating appropriate national, local, or online referrals. VictimConnect also has a special focus on populations, crimes, and topics that are generally underrepresented or underserved in victim services.",
    phone: "1-855-484-2846",
  },
  {
    name: "National Disaster Distress Helpline",
    description:
      "The Disaster Distress Helpline is a national hotline dedicated to providing year-round immediate crisis counseling for people who are experiencing emotional distress related to any natural or human-caused disaster. This toll-free, multilingual, and confidential crisis support service is available to all residents in the United States and its territories. Stress, anxiety, and other depression-like symptoms are common reactions after a disaster.",
    phone: "1-855-484-2846",
  },
  {
    name: "United Way",
    description:
      "Every day thousands of people across North America turn to 2-1-1 for information and support—whether financial, domestic, health or disaster-related. 2-1-1 is a free, confidential referral and information helpline and website that connects people from all communities and of all ages to the essential health and human services they need, 24 hours a day, seven days a week.",
    phone: "2-1-1",
  },
];

const Hotlines = () => (
  <Container>
    <PageBanner color={colors.pink}>
      <Typography variant="h1">Hotlines</Typography>
    </PageBanner>
    <List>
      {hotlineList.map(({ name, description, phone }) => (
        <HotlineCard
          key={name}
          name={name}
          description={description}
          phone={phone}
        />
      ))}
    </List>
  </Container>
);

export default Hotlines;
