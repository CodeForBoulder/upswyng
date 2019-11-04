import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { colors } from '../App.styles';

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
