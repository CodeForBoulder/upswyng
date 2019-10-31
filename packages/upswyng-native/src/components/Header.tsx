import React from "react";

import UpswyngLogo from "../icons/Upswyng";
import { View } from "react-native";

const Header = () => {
  return (
    <View
      style={{
        marginTop: 8,
        marginBottom: 8,
        height: 46,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}>
      <View />
      <View
        style={{
          width: 128,
          height: 46,
        }}>
        <UpswyngLogo />
      </View>
    </View>
  );
};

export default Header;
