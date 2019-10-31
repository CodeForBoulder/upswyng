import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

function TwoColumnLayout<T extends JSX.Element>(props: { items: T[] }) {
  return (
    <View>
      {props.items
        .map((item, i, items) => {
          if (i % 2 === 0) {
            const leftItem = item;
            let rightItem = <View />;
            if (i + 1 < items.length) {
              rightItem = items[i + 1];
            }
            return (
              <View
                key={i}
                style={{
                  alignContent: "stretch",
                  flexDirection: "row",
                  flex: 1,
                  marginBottom: 8,
                }}>
                <View style={{ flex: 1 }}>{leftItem}</View>
                <View style={{ width: 8 }} />
                <View style={{ flex: 1 }}>{rightItem}</View>
              </View>
            );
          }
        })
        .filter(Boolean)}
    </View>
  );
}

export default TwoColumnLayout;
