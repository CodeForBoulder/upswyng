import React from "react";
import { colors } from "../App.styles";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  Linking,
} from "react-native";
import { BoldText } from "./UpText";
import { TIconProps } from "../types";
import { withRouter, RouteComponentProps } from "react-router-native";

interface HomeButtonProps extends RouteComponentProps {
  buttonColor: string;
  href?: string; // 'href' will override `linkState`
  icon: React.ComponentType<TIconProps>;
  linkState?: string; // 'href' will override `linkState`
  text: string;
}

const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

const HomeButton = (props: HomeButtonProps) => {
  const Icon = props.icon;
  const styles = createStyles(props.buttonColor || colors.greyDark);
  let onPress = () => {};
  if (props.linkState) {
    onPress = () => props.history.push(props.linkState);
  }
  if (props.href) {
    onPress = () => Linking.openURL(props.href);
  }
  return (
    <Touchable
      accessibilityLabel={props.text}
      testID={`button_test_${props.text}`}
      onPress={onPress}>
      <View style={styles.item}>
        <BoldText
          fontSize={20}
          style={{
            color: colors.white,
            left: 0,
            marginBottom: -12,
            position: "relative",
            top: 0,
          }}>
          {props.text}
        </BoldText>
        <View
          style={{
            alignSelf: "flex-end",
            height: 36,
            position: "relative",
            width: 36,
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
