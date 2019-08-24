import React from "react";
import { colors } from "../App.styles";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { BoldText } from "./UpText";
import { TIconProps } from "../types";
import { withRouter, RouteComponentProps } from "react-router-native";

interface HomeButtonProps extends RouteComponentProps {
  buttonColor: string;
  linkState: string;
  text: string;
  icon: React.ComponentType<TIconProps>;
}

const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

const HomeButton = (props: HomeButtonProps) => {
  const Icon = props.icon;
  const styles = createStyles(props.buttonColor || colors.greyDark);
  return (
    <Touchable
      accessibilityLabel={props.text}
      testID={`button_test_${props.text}`}
      onPress={() => props.history.push(props.linkState)}>
      <View style={styles.item}>
        <BoldText fontSize={20} style={{ color: "#fff" }}>
          {props.text}
        </BoldText>
        <View
          style={{
            alignSelf: "flex-end",
            height: 36,
            width: 36,
            justifyContent: "flex-end",
          }}>
          <Icon color="#fff" />
        </View>
      </View>
    </Touchable>
  );
};

const createStyles = (color: string) =>
  StyleSheet.create({
    item: {
      backgroundColor: `${color}`,
      padding: 12,
      flex: 1,
      justifyContent: "space-between",
    },
  });

export default withRouter(HomeButton);
