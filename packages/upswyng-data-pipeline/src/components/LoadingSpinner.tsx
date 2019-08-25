import React from "react";
import { colors } from "../App.styles";
import { Text } from "react-native";
// const LoadingSpinner = styled(CircularProgress)`
//   && {
//     display: block;
//     margin: 0 auto;
//   }
//   svg * {
//     stroke: ${colors.orangePrimary};
//   }
// ` as typeof CircularProgress;

const LoadingSpinner = () => <Text>"Loading"</Text>;

export default LoadingSpinner;
