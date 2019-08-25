import React, { Children } from "react";
import { TResource, TSchedule, TDay } from "../types";
import useResource from "../useResource";
import { FIREBASE_RESOURCE_BRANCH } from "../constants";
// import Details, { DetailBody, DetailHeading } from "./Details";
// import Schedule from "./Schedule";
// import Services from "./Services";
// import Map from "./Map";
import { orderSchedule } from "../utility/schedule";
import { withRouter, RouteComponentProps } from "react-router-native";
import { colors } from "../App.styles";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { BoldText, RegularText } from "./UpText";

interface Props extends RouteComponentProps<{ id: string }> {
  id: string;
}

const Heading = (props: { children: React.ReactChild }) => (
  <BoldText fontSize={16} style={{ color: colors.white, marginBottom: 8 }}>
    {props.children}
  </BoldText>
);

const Body = (props: { children: React.ReactChild }) => (
  <RegularText fontSize={14} style={{ color: colors.white, marginBottom: 24 }}>
    {props.children}
  </RegularText>
);

export const Resource = (props: Props) => {
  const id = props.match.params.id;
  const resourceDataRef = `${FIREBASE_RESOURCE_BRANCH}/${id}`;
  const resource = useResource(resourceDataRef);

  if (!resource) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.orangePrimary} />
      </View>
    );
  }

  const { charityname: resourceName, schedule } = resource;
  const { address1, address2, city, phone, state, zip } = resource;

  return (
    <View style={{ flex: 1 }}>
      <BoldText fontSize={22} style={{ color: colors.white, marginBottom: 24 }}>
        {resourceName}
      </BoldText>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}>
        <Heading>Address</Heading>
        <Body>
          <>
            {address1}, {address2 ? `${address2},` : ""} {city}, {state} {zip}
          </>
        </Body>
        <Heading>Phone:</Heading>
        <Body>{phone}</Body>
        <Heading>Schedule:</Heading>
        <Schedule schedule={schedule} />
        <Heading>Services:</Heading>
        {/* <DetailBody>
        <Services resource={resource} />
      </DetailBody> */}
        {/* <Map resource={resource} /> */}
      </ScrollView>
    </View>
  );
};

export default withRouter(Resource);

class Schedule extends React.Component<{ schedule: TSchedule[] }> {
  static WeeklySchedule = ({ schedule }: { schedule: TSchedule[] }) => (
    <View style={{ marginBottom: 20 }}>
      {schedule.map((line, i) => (
        <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
          <View style={{ width: "25%" }}>
            <RegularText style={{ color: colors.white }}>
              <>{line.day}:</>
            </RegularText>
          </View>
          <View>
            <RegularText style={{ color: colors.white }}>
              <>
                {line.fromstring} - {line.tostring}
              </>
            </RegularText>
          </View>
        </View>
      ))}
    </View>
  );

  static MonthlySchedule = ({ schedule }: { schedule: TSchedule[] }) => (
    <>
      {schedule.map(s => {
        const { day, fromstring, period, tostring } = s;
        if (period) {
          return (
            <Body key={`${period}-${day}-${fromstring}`}>
              <>
                every {period.toLowerCase()} {day} from {fromstring} -{" "}
                {tostring}
              </>
            </Body>
          );
        }
        return null;
      })}
    </>
  );

  render() {
    const schedule = this.props.schedule;
    if (schedule && schedule.length) {
      const { type } = schedule[0];
      const orderedSchedule = orderSchedule(schedule);

      switch (type) {
        case "Weekly":
          return <Schedule.WeeklySchedule schedule={orderedSchedule} />;
        case "Monthly":
          return <Schedule.MonthlySchedule schedule={orderedSchedule} />;
        case "Open 24/7":
          return <Body>{type}</Body>;
      }
    }
    return <Body>Unavailable</Body>;
  }
}
