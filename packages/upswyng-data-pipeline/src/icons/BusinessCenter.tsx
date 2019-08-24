import Svg, { Path } from "react-native-svg";
import React from "react";
import { TIconProps } from "../types";

export default class BusinessCenter extends React.Component<TIconProps> {
  render() {
    return (
      <Svg
        preserveAspectRatio="xMaxYMax"
        width="100%"
        height="100%"
        viewBox="2 2 20 20">
        <Path fill="none" d="M0 0h24v24H0zm10 5h4v2h-4zm0 0h4v2h-4z" />
        <Path
          fill={this.props.color}
          d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"
        />
      </Svg>
    );
  }
}
