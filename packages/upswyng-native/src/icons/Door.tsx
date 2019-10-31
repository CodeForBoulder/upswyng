import Svg, { Path, G } from "react-native-svg";
import React from "react";
import { TIconProps } from "../types";

export default class Door extends React.Component<TIconProps> {
  render() {
    return (
      <Svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMaxYMax"
        viewBox="0 0 26.084 38.563">
        <G transform="translate(-534.44 -448.249)">
          <Path
            fill={this.props.color}
            d="M534.44,486.979h9.167v-2.244h-6.922V454.719h6.922v-2.244H534.44Z"
            transform="translate(0 -2.031)"
          />
          <Path
            fill={this.props.color}
            d="M555.442,448.249v38.562l15.176-3.566V451.981Zm3.776,21.832a1.763,1.763,0,1,1,1.763-1.763A1.763,1.763,0,0,1,559.218,470.081Z"
            transform="translate(-10.094 0)"
          />
        </G>
      </Svg>
    );
  }
}
