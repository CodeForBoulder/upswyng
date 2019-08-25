import React from "react";
import { SEARCH_PARAM_RESOURCE } from "../constants";
import { View } from "react-native";
import { colors } from "../App.styles";
import { RegularText, BoldText } from "./UpText";
import AddIcon from "../icons/Add";
import { Link } from "react-router-native";

interface Props {
  resourceId: string;
  resourceName: string;
}

const ResourceCard = ({ resourceId, resourceName }: Props) => (
  <Link
    style={{ flex: 1 }}
    to={{
      pathname: "/resource",
      search: `?${SEARCH_PARAM_RESOURCE}=${resourceId}`,
    }}>
    <View
      style={{ flex: 1, backgroundColor: colors.greyLight, borderRadius: 8 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}>
        <BoldText
          fontSize={11}
          style={{
            width: "100%",
            color: "white",
            textShadowOffset: { width: 2, height: 2 },
            textShadowColor: "#0005",
            textShadowRadius: 5,
            padding: 4,
          }}>
          {resourceName}
        </BoldText>
      </View>
      <View style={{ height: 28, flexDirection: "row", alignItems: "stretch" }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.greyMedium,
            borderBottomLeftRadius: 8,
            flex: 1,
            flexDirection: "row",
            paddingLeft: 4,
          }}>
          <RegularText fontSize={10} style={{ color: colors.white }}>
            {"schedule placeholder"}
          </RegularText>
        </View>
        <View
          style={{
            backgroundColor: colors.orangePrimary,
            width: 31,
            justifyContent: "center",
            alignItems: "center",
            borderBottomRightRadius: 8,
          }}>
          <View style={{ height: 12, width: 12 }}>
            <AddIcon color={colors.white} />
          </View>
        </View>
      </View>
    </View>
  </Link>
);

export default ResourceCard;
