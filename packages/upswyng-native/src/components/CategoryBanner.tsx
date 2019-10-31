import React from "react";
import { colors, font } from "../App.styles";
import ArrowBackIcon from "../icons/ArrowBack";
import { RegularText } from "./UpText";
import { RouteComponentProps, withRouter } from "react-router-native";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

interface Props extends RouteComponentProps {
  color?: string;
  text: string;
}

// const CategoryBannerContainer = styled.div`
//   align-items: stretch;
//   background: ${props => (props.color ? props.color : colors.greyLight)};
//   display: flex;
//   flex-direction: row;
//   padding: ${font.helpers.convertPixelsToRems(14)} 0;
//   wrap: no-wrap;
// `;

// const CategoryBannerLink = styled(Link)`
//   align-items: center;
//   display: flex;
//   padding-right: ${font.helpers.convertPixelsToRems(12)};
// `;

// const CategoryBannerIcon = styled(Icon)`
//   && {
//     align-items: center;
//     display: flex;
//     font-size: ${font.helpers.convertPixelsToRems(36)};
//     height: auto;
//     width: auto;
//   }
// ` as typeof Icon;

// const CategoryBannerArrowBack = styled(ArrowBack)`
//   && {
//     font-size: inherit;
//   }
// ` as typeof ArrowBack;

// const CategoryBannerHeading = styled.h1`
//   align-items: center;
//   display: flex;
//   font-size: ${font.helpers.convertPixelsToRems(24)};
//   font-weight: 400;
//   margin: ${font.helpers.convertPixelsToRems(-2)} 0 0;
// `;

const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

const CategoryBanner = ({ color, text, history }: Props) => (
  <Touchable
    accessibilityLabel="Go back"
    testID={`test_back_button`}
    onPress={() => history.push("/")}>
    <View
      style={{
        height: 48,
        backgroundColor: color,
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
      }}>
      <View
        style={{
          height: 24,
          width: 24,
          marginRight: 8,
        }}>
        <ArrowBackIcon color={colors.white} />
      </View>
      <RegularText fontSize={24} style={{ color: colors.white, marginLeft: 8 }}>
        {text}
      </RegularText>
    </View>
  </Touchable>
);

export default withRouter(CategoryBanner);
