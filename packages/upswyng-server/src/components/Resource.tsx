import React from "react";
import { TLegacyResource, TLegacySchedule } from "../types";
import useResource from "../useResource";
import { FIREBASE_RESOURCE_BRANCH } from "../constants";
import Map from "./Map";
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
  const resource: TLegacyResource | null = useResource(resourceDataRef);

  if (!resource) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.orangePrimary} />
      </View>
    );
  }

  const { charityname: resourceName, schedule } = resource;
  const {
    address1,
    address2,
    city,
    phone,
    servicetype: serviceType,
    state,
    zip,
  } = resource;

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
        <Services serviceType={serviceType} />
        <Map resource={resource} />
      </ScrollView>
    </View>
  );
};

export default withRouter(Resource);

class Schedule extends React.Component<{ schedule: TLegacySchedule[] }> {
  static WeeklySchedule = ({ schedule }: { schedule: TLegacySchedule[] }) => (
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

  static MonthlySchedule = ({ schedule }: { schedule: TLegacySchedule[] }) => (
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

interface TServicesProps {
  serviceType: string;
}

const Services = (props: TServicesProps) => {
  // technically we should have made sure this was a string
  // already though data validation, but just for good measure:
  const s = props.serviceType || "";
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 24 }}>
      {s.split(",").map((item: string, i: number) => {
        const x = item.trim();
        if (!x) return null;
        return (
          <BoldText
            fontSize={14}
            key={i}
            style={{
              backgroundColor: colors.greyLight,
              borderRadius: 24,
              color: colors.white,
              flex: 0,
              marginBottom: 6,
              marginRight: 8,
              paddingBottom: 4,
              paddingLeft: 12,
              paddingRight: 14,
              paddingTop: 4,
            }}>
            {x}
          </BoldText>
        );
      })}
    </View>
  );
};
