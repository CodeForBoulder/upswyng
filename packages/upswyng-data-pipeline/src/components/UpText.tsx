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
  useEffect(() => {
    Font.loadAsync({
      "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf"),
    }).then(() => setReady(true));
  });

  return (
    <Text
      style={[
        props.style || {},
        {
          fontSize: props.fontSize || 16,
          fontFamily: isReady ? "open-sans-bold" : "",
          fontWeight: "700",
        },
      ]}>
      {props.children}
    </Text>
  );
}

export function RegularText<T>(props: TUpTextProps<T>) {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      "open-sans": require("../../assets/fonts/OpenSans-Regular.ttf"),
    }).then(() => setReady(true));
  });

  return (
    <Text
      style={[
        props.style || {},
        {
          fontSize: props.fontSize || 12,
          fontFamily: isReady ? "open-sans" : "",
          fontWeight: "400",
        },
      ]}>
      {props.children}
    </Text>
  );
}
