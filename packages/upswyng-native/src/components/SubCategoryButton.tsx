import React from "react";
import { colors } from "../App.styles";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { RegularText } from "./UpText";
import { RouteComponentProps, withRouter } from "react-router";

interface Props extends RouteComponentProps {
  buttonColor: string;
  text: string;
  onSubcategoryClick: () => any;
}
const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

const SubCategoryButton = ({
  text,
  buttonColor,
  onSubcategoryClick,
}: Props) => {
  return (
    <Touchable
      accessibilityLabel="Go back"
      testID={`test_back_button`}
      onPress={onSubcategoryClick}>
      <View
        style={{
          backgroundColor: buttonColor,
          height: 36,
          borderRadius: 4,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <RegularText fontSize={14} style={{ color: colors.white }}>
          {text}
        </RegularText>
      </View>
    </Touchable>
  );
};

export default withRouter(SubCategoryButton);
