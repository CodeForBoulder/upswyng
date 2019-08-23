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
  readonly height: number;
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
            height: props.height,
          }).item
        }>
        <Text style={textStyle.text}>{props.text}</Text>
      </View>
    </Touchable>
  );
};

const createStyles = ({ color, height }: { color: string; height: number }) =>
  StyleSheet.create({
    item: {
      backgroundColor: `${color}`,
      height,
      marginRight: 6,
      marginLeft: 6,
      marginBottom: 12,
      padding: 6,
      width: "50%",
    },
  });

const textStyle = StyleSheet.create({ text: { color: "white" } });

export default HomeButton;
