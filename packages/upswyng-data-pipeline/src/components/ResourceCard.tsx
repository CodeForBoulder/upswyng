import React from "react";
import { SEARCH_PARAM_RESOURCE } from "../constants";
import { View, Text } from "react-native";

interface Props {
  resourceId: string;
  resourceName: string;
}

// const ResourceCardContainer = styled(Link)`
//   border-radius: 6px;
//   display: flex;
//   flex-direction: column;
//   flex: 1 1 auto;
//   font-family: ${font.families.openSans};
//   overflow: hidden;
//   &:link,
//   &:visited {
//     text-decoration: none;
//   }
//   &:hover,
//   &:active {
//     text-decoration: none;
//     & > *:first-child {
//       text-decoration: underline;
//     }
//   }
// `;

// const ResourceCardImageContainer = styled.div`
//   position: relative;
//   background: ${colors.greyLight};
//   flex: 1 1 auto;
//   &::before {
//     content: "";
//     display: block;
//     padding-bottom: ${(96 / 146) * 100}%;
//     width: 100%;
//   }
// `;

// const ResourceCardResourceName = styled.span`
//   bottom: 4px;
//   color: ${colors.white};
//   display: flex;
//   flex-direction: column;
//   font-size: ${font.helpers.convertPixelsToRems(14)};
//   font-weight: 700;
//   padding: 0 8px 8px;
//   position: absolute;
//   width: 100%;
//   text-decoration: inherit;
//   text-shadow: 0 3px 6px ${colors.black};
// `;

// const ResourceCardFooter = styled.span`
//   align-items: stretch;
//   display: flex;
//   flex-direction: row;
// `;

// const ResourceCardScheduleContainer = styled.span`
//   align-items: center;
//   background: ${colors.greyMedium};
//   display: flex;
//   flex: 1 1 auto;
//   font-size: ${font.helpers.convertPixelsToRems(12)};
//   font-weight: 600;
//   text-decoration: none;
//   padding: 0 8px;
// `;

// const ResourceCardIconContainer = styled.span`
//   align-items: center;
//   display: flex;
//   background: ${colors.orangePrimary};
//   flex: 0 1 auto;
//   padding: 6px 12px;
// `;

const ResourceCard = ({ resourceId, resourceName }: Props) => (
  <View>
    <Text>{resourceName}</Text>
  </View>
);

// const ResourceCard = ({ resourceId, resourceName }: Props) => (
//   <ResourceCardContainer
//     to={{
//       pathname: "/resource",
//       search: `?${SEARCH_PARAM_RESOURCE}=${resourceId}`,
//     }}>
//     <ResourceCardImageContainer>
//       <ResourceCardResourceName>{resourceName}</ResourceCardResourceName>
//     </ResourceCardImageContainer>
//     <ResourceCardFooter>
//       <ResourceCardScheduleContainer>
//         schedule placeholder
//       </ResourceCardScheduleContainer>
//       <ResourceCardIconContainer>
//         <Add />
//       </ResourceCardIconContainer>
//     </ResourceCardFooter>
//   </ResourceCardContainer>
// );

export default ResourceCard;
