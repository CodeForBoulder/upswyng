import React from "react";
import { TIconProps } from "../types";
import Svg, { Path } from "react-native-svg";

export default class DirectionsBus extends React.Component<TIconProps> {
  render() {
    return (
      <Svg
        preserveAspectRatio="xMaxYMax"
        width="100%"
        height="100%"
        viewBox="2 2 20 20">
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path
          fill={this.props.color}
          d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"
        />
      </Svg>
    );
  }
}
