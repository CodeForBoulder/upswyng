import Svg, { Path } from "react-native-svg";
import React from "react";
import { TIconProps } from "../types";

export default class Add extends React.Component<TIconProps> {
  render() {
    return (
      <Svg width="100%" height="100%" viewBox="5 5 14 14">
        <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={this.props.color} />
        <Path d="M0 0h24v24H0z" fill="none" />
      </Svg>
    );
  }
}
