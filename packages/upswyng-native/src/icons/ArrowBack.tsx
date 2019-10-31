import Svg, { Path } from "react-native-svg";
import React from "react";
import { TIconProps } from "../types";

export default class Banana extends React.Component<TIconProps> {
  render() {
    return (
      <Svg width="100%" height="100%" viewBox="3.75 3.75 16.5 16.5">
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path
          fill={this.props.color}
          d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        />
      </Svg>
    );
  }
}
