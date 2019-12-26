import { CircularProgress } from "@material-ui/core";
import { colors } from "../App.styles";
import styled from "styled-components";

const LoadingSpinner = styled(CircularProgress)`
  && {
    display: block;
    margin: 0 auto;
  }
  svg * {
    stroke: ${colors.orangePrimary};
  }
` as typeof CircularProgress;

export default LoadingSpinner;
