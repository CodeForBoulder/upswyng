import {
  Linking,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";

import { BoldText } from "./UpText";
import React from "react";
import { TIconProps } from "../nativeTypes";
import { colors } from "../App.styles";

interface HomeButtonProps extends RouteComponentProps {
  buttonColor: string;
  href?: string; // 'href' will override `linkState`
  icon: React.ComponentType<TIconProps>;
  linkState?: string; // 'href' will override `linkState`
  text: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    item: {
      backgroundColor: `${color}`,
      padding: 12,
      flex: 1,
      justifyContent: "space-between",
    },
  });

const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

const HomeButton = (props: HomeButtonProps) => {
  const Icon = props.icon;
  const styles = createStyles(props.buttonColor || colors.greyDark);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
      onPress={onPress}
    >
      <View style={styles.item}>
        <BoldText
          fontSize={20}
          style={{
            color: colors.white,
            left: 0,
            marginBottom: -12,
            position: "relative",
            top: 0,
          }}
        >
          {props.text}
        </BoldText>
        <View
          style={{
            alignSelf: "flex-end",
            height: 36,
            position: "relative",
            width: 36,
          }}
        >
          <Icon color="#fff" />
        </View>
      </View>
    </Touchable>
  );
};

export default withRouter(HomeButton);
