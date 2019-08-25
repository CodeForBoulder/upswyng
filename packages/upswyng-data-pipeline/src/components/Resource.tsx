import React, { Children } from "react";
import { TResource } from "../types";
import useResource from "../useResource";
import { FIREBASE_RESOURCE_BRANCH } from "../constants";
// import Details, { DetailBody, DetailHeading } from "./Details";
// import Schedule from "./Schedule";
// import Services from "./Services";
// import Map from "./Map";
import { withRouter, RouteComponentProps } from "react-router-native";
import { colors } from "../App.styles";
import { View, ActivityIndicator } from "react-native";
import { BoldText, RegularText } from "./UpText";

interface Props extends RouteComponentProps<{ id: string }> {
  id: string;
}

const renderPhoneContent = (resource: TResource) => {
  const { phone } = resource;
  return <p>{phone}</p>;
};

export const Resource = (props: Props) => {
  const id = props.match.params.id;
  const resourceDataRef = `${FIREBASE_RESOURCE_BRANCH}/${id}`;
  console.log("fetching resource ", resourceDataRef);
  const resource = useResource(resourceDataRef);

  if (!resource) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.orangePrimary} />
      </View>
    );
  }

  const { charityname: resourceName, schedule } = resource;

  const Heading = (props: { children: React.ReactChild }) => (
    <BoldText fontSize={22} style={{ color: colors.white }}>
      {props.children}
    </BoldText>
  );

  const Body = (props: { children: React.ReactChild }) => (
    <RegularText fontSize={18} style={{ color: colors.white }}>
      {props.children}
    </RegularText>
  );
  const { address1, address2, city, state, zip } = resource;

  return (
    <View style={{ flex: 1 }}>
      <BoldText fontSize={22} style={{ color: colors.white }}>
        {resourceName}
      </BoldText>
      {/* <Details>
        <Heading>Address</Heading>
        <DetailBody>
          <p>
            {address1}, {address2 ? `${address2},` : ""} {city}, {state} {zip}
          </p>
        </DetailBody>
        <Heading>Phone</Heading>
        <DetailBody>{renderPhoneContent(resource)}</DetailBody>
        <Heading>Schedule</Heading>
        <DetailBody>
          <Schedule schedule={schedule} />
        </DetailBody>
        <Heading>Services</Heading>
        <DetailBody>
          <Services resource={resource} />
        </DetailBody>
      </Details>
      <Map resource={resource} /> */}
    </View>
  );
};

export default withRouter(Resource);
