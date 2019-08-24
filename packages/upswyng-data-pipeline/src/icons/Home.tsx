import Svg, { Path } from "react-native-svg";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TIconProps } from "../types";

export default class Home extends React.Component<TIconProps> {
  render() {
    return (
      <Svg
        preserveAspectRatio="xMaxYMax"
        width="100%"
        height="100%"
        viewBox="2 3 20 18">
        <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={this.props.color} />
        <Path d="M0 0h24v24H0z" fill="none" />
      </Svg>
    );
  }
}
