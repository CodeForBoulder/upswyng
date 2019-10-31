import Svg, { Path } from "react-native-svg";
import React from "react";
import { TIconProps } from "../types";

export default class LocalHospital extends React.Component<TIconProps> {
  render() {
    return (
      <Svg
        preserveAspectRatio="xMaxYMax"
        width="100%"
        height="100%"
        viewBox="3 3 18 18">
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path
          fill={this.props.color}
          d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"
        />
      </Svg>
    );
  }
}
