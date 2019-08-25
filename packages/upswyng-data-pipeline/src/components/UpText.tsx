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
  return (
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
}
export function RegularText<T>(props: TUpTextProps<T>) {
  return (
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
}
