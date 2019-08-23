import React from "react";

import { colors } from "../App.styles";
import { TIconProps } from "../types";

const DoorIcon = (props: TIconProps) => {
  const color = props.color || colors.white;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26.084"
      height="38.563"
      viewBox="0 0 26.084 38.563">
      <g transform="translate(-534.44 -448.249)">
        <path
          d="M534.44,486.979h9.167v-2.244h-6.922V454.719h6.922v-2.244H534.44Z"
          transform="translate(0 -2.031)"
          fill={color}
        />
        <path
          d="M555.442,448.249v38.562l15.176-3.566V451.981Zm3.776,21.832a1.763,1.763,0,1,1,1.763-1.763A1.763,1.763,0,0,1,559.218,470.081Z"
          transform="translate(-10.094 0)"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default DoorIcon;
