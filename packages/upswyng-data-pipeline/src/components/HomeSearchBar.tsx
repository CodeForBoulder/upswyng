import {
  TextInput,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon from "../icons/Search";
import { colors } from "../App.styles";
import React from "react";
import CloseIcon from "../icons/Close";

const Touchable = (Platform.OS === "android"
  ? TouchableNativeFeedback
  : TouchableOpacity) as React.ReactType;

interface THomeSearchProps {
  value: string;
  onChange: (arg: string) => void;
}
const HomeSearch = (props: THomeSearchProps) => (
  <View
    style={{
      backgroundColor: colors.white,
      marginBottom: 8,
      height: 36,
      flexDirection: "row",
      paddingLeft: 8,
      paddingRight: 8,
      alignItems: "center",
    }}>
    <View style={{ height: 18, width: 18 }}>
      <SearchIcon color={colors.black} />
    </View>
    <TextInput
      autoCorrect={false}
      onChangeText={props.onChange}
      placeholder="Search - What are your needs today?"
      style={{
        flex: 1,
        fontFamily: "open-sans",
        fontSize: 16,
        height: 24,
        marginLeft: 8,
        marginRight: 4,
      }}
      value={props.value}
    />
    <Touchable
      accessibilityLabel="Clear search"
      onPress={() => props.onChange("")}>
      <View style={{ height: 18, width: 18 }}>
        {!!props.value && <CloseIcon color={colors.black} />}
      </View>
    </Touchable>
  </View>
);

export default HomeSearch;
