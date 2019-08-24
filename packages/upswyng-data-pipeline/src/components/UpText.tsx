import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";
import { StyleSheet } from "react-native";

interface TUpTextProps<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
> {
  children: React.ReactChild;
  style?: T;
  fontSize?: number;
}

export function BoldText<T>(props: TUpTextProps<T>) {
  const [isReady, setReady] = useState(false);
  const UnstyledText = (
    <Text
      style={[
        {
          fontSize: props.fontSize || 16,
        },
        props.style || {},
      ]}>
      {props.children}
    </Text>
  );
  const StyledText = (
    <Text
      style={[
        {
          fontSize: props.fontSize || 16,
          fontFamily: "open-sans-bold",
        },
        props.style || {},
      ]}>
      {props.children}
    </Text>
  );
  useEffect(() => {
    Font.loadAsync({
      "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
    }).then(() => setReady(true));
  });

  return isReady ? StyledText : UnstyledText;
}

export function RegularText<T>(props: TUpTextProps<T>) {
  const [isReady, setReady] = useState(false);
  const UnstyledText = (
    <Text
      style={[
        {
          fontSize: props.fontSize || 12,
        },
        props.style || {},
      ]}>
      {props.children}
    </Text>
  );
  const StyledText = (
    <Text
      style={[
        {
          fontSize: props.fontSize || 12,
          fontFamily: "open-sans",
        },
        props.style || {},
      ]}>
      {props.children}
    </Text>
  );
  useEffect(() => {
    Font.loadAsync({
      "open-sans": require("../../assets/fonts/OpenSans-Regular.ttf"),
    }).then(() => setReady(true));
  });

  return isReady ? StyledText : UnstyledText;
}
