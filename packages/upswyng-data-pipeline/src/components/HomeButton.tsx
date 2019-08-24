import React from "react";
import { colors } from "../App.styles";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TIconProps } from "../types";

interface HomeButtonProps {
  readonly buttonColor: string;
  readonly text: string;
  readonly icon: React.ReactElement<TIconProps>;
}

const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

const HomeButton = (props: HomeButtonProps) => {
  return (
    <Touchable>
      <View
        style={
          createStyles({
            color: props.buttonColor || colors.greyDark,
          }).item
        }>
        <Text style={textStyle.text}>{props.text}</Text>
      </View>
    </Touchable>
  );
};

const createStyles = ({ color }: { color: string }) =>
  StyleSheet.create({
    item: {
      backgroundColor: `${color}`,
      padding: 12,
      flex: 1,
      flexDirection: "row",
    },
  });

const textStyle = StyleSheet.create({ text: { color: "white" } });

export default HomeButton;
