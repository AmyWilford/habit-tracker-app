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
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { sizes, fonts, colors, shadow } from "../constants";
import { TaskCard } from "../components";
export default function Listpage() {
  const [listValue, setListValue] = useState({ name: "", tasks: [] });
  const [multiListArray, setMultiListArray] = useState([]);

  //   Function to get data from local storage
  const getData = async () => {
    try {
      const jsonListArray = await AsyncStorage.getItem("@multiListArray");
      return jsonListArray != null ? setMultiListArray(JSON.parse(jsonListArray)) : null;
    } catch (err) {
      console.log(err);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        "@multiListArray",
        JSON.stringify(multiListArray)
      );
    } catch (err) {
      console.log(err);
    }
  };

  function addNewList() {
    Alert.prompt("new list", "Give your list a name", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (text) => {
          if (text === "") {
            alert("enter a list name ");
          } else {
            // setListValue({ name: text });
            setMultiListArray([...multiListArray, { name: text, tasks: [] }]);
            console.log("multi list array: ", multiListArray);
          }
          console.log(listValue);
        },
      },
    ]);
  }
  //   Use effect to getData from local storage on each reload
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [multiListArray]);
  return (
    <View style={styles.ListpageView}>
        <FlatList
          style={{ flex: 1 }}
          data={multiListArray}
          renderItem={({ item, index }) => (
            <Text data={item}>{item.name}</Text>
            // <TaskCard
            //   data={item}
            //   index={index}
            //   setChecked={setChecked}
            //   deleteItemFromList={deleteItemFromList}
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      <View style={styles.listInputWrapper}>
        
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => addNewList()}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ListpageView: {
    flex: 1,
    backgroundColor: colors.background,
    padding: sizes.padding,
  },
  listInputWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 5,
    justifyContent: "space-around",
  },
  buttonWrapper: {
    backgroundColor: colors.accent,
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: sizes.h1,
  },
});
