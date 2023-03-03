import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    ScrollView,
    //   NestableScrollContainer,
    //   DraggableFlatList,
  } from "react-native";

  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { sizes, fonts, colors, shadow } from "../constants";
  import { TaskCard } from "../components";

export default function ListCard() {
  return (
    <View>
      <Text>ListCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
