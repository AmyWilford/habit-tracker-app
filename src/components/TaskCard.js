// Import required React dependencies and native components
import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Checkbox from "expo-checkbox";

// Import custom constant styles
import { sizes, fonts, colors, shadow } from "../constants";

// Custom Task Card Component to show individual task items on the list
export default function TaskCard(props) {
  return (
    <Pressable
      style={styles.cardView}
      onLongPress={() => props.deleteItemFromList(props.index)}
    >
      <Checkbox
        style={styles.checkbox}
        value={props.data.isChecked}
        onValueChange={(value) => props.setChecked(props.index, value)}
        color={props.data.isChecked ? colors.primary : colors.accent}
      />
      <Text
        style={{
          ...styles.text,
          textDecorationLine: props.data.isChecked ? "line-through" : "none",
        }}
      >
        {props.data.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardView: {
    ...shadow,
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: sizes.padding,
    borderRadius: sizes.borderRadius,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 10,
    alignSelf: "center"
  },
  checkbox: {
    height: 26,
    width: 26,
    borderRadius: 5,
    marginRight: 15,
    border: "none",
  },
  text: {
    ...fonts.task_text,
    flex: 1,
  },
});
