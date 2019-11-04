import { Chip } from "@material-ui/core";
import { colors, font } from "../App.styles";
import { TResource } from "@upswyng/upswyng-types";
import React from "react";
import styled from "styled-components";

interface Props {
  resource: TResource;
}

const ServicesList = styled.ul`
  && {
    padding: 0;
    margin: 0 ${font.helpers.convertPixelsToRems(-5)};
  }
`;

const ServicesItem = styled.li`
  && {
    display: inline-block;
    line-height: 1.4;
    margin: ${font.helpers.convertPixelsToRems(5)};
  }
`;

const ServicesChip = styled(Chip)`
  && {
    background-color: ${colors.greyLight};
    color: ${colors.white};
    font-family: ${font.families.openSans};
    margin: 0;
  }
` as typeof Chip;

const Services = ({ resource }: Props) => {
  if (resource) {
    const { services } = resource;
    if (services) {
      const serviceItems = services.map(service => (
        <ServicesItem key={service.trim()}>
          <ServicesChip component={"span"} label={service.trim()} role={""} />
        </ServicesItem>
      ));

      if (serviceItems.length) {
        return <ServicesList>{serviceItems}</ServicesList>;
      }
    }
  }
  return null;
};

export default Services;
