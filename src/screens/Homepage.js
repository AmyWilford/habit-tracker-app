// Import all React and React Native components
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from "react-native";

// Import AsyncStorage for local storage of tasklists
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import style constants
import { sizes, fonts, colors, shadow } from "../constants";
// Import Required Custom Components
import { TaskCard } from "../components";

// Homepage Function
function Homepage() {
  // Object value for individual task item - includes task text and checkbox status
  const [value, setValue] = useState({ text: "", isChecked: false });
  //   Array value of total list task objects
  const [list, setList] = useState([]);

  //   Function to get data from local storage
  const getData = async () => {
    try {
      const jsonList = await AsyncStorage.getItem("@taskList");
      return jsonList != null ? setList(JSON.parse(jsonList)) : null;
    } catch (err) {
      console.log(err);
    }
  };

  // Function to store data to local storage
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@taskList", JSON.stringify(list));
    } catch (err) {
      console.log(err);
    }
  };
  // Function to add task to total task list and show on screen
  const addTaskToList = (task) => {
    if (task == "") {
      alert("Please enter something to save to your list");
    } else {
      setList([...list, { text: task, isChecked: false }]);
      setValue({ text: "", isChecked: false });
    }
  };

  // Function to clear list
  function clearList() {
    setList([]);
  }

  function resetList() {
    let data = [];
    for (let i = 0; i < list.length; i++) {
      data.push({ ...list[i], isChecked: false });
    }
    setList(data);
  }
  // Function to set check value of item list when clicked and update list value

  function setChecked(index, value) {
    let data = [];

    for (let i = 0; i < list.length; i++) {
      if (index === i) {
        data.push({ ...list[i], isChecked: value });
      } else {
        data.push(list[i]);
      }
    }
    setList(data);
  }

  //Function to deleteItem from the list and remove from local storage
  function deleteItemFromList(taskToDelete) {
    Alert.alert(
      "delete task",
      "Are you sure you want to delete this task from your list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const data = list.filter((item, index) => index !== taskToDelete);
            setList(data);
            AsyncStorage.setItem("@taskList", JSON.stringify(list));
          },
          style: "cancel",
        },
      ],
      //   allow action to be cancelled by clicking outside of alert box
      {
        cancelable: true,
      }
    );
  }

  //   Use effect to getData from local storage on each reload
  useEffect(() => {
    getData();
  }, []);

  //   Use effect to storeData to local storage each time the list variable changes
  useEffect(() => {
    storeData();
  }, [list]);

  return (
    <View style={styles.HomepageView}>
      <View style={styles.headingView}>
        <Text style={styles.title}>Habit Tracker</Text>
        <View>
          <TouchableOpacity
            style={styles.clearListWrapper}
            onPress={() => resetList()}
          >
            <Text style={[styles.listSetting, { color: colors.accent }]}>
              reset list
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearListWrapper}
            onPress={() => clearList()}
          >
            <Text style={[styles.listSetting, { color: colors.primary }]}>
              clear list
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Render TaskCard components for each item on the list */}
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => <></>}
        ListFooterComponent={() => (
          <Text>
            <></>
          </Text>
        )}
        style={{ flex: 1, marginBottom: 80 }}
        renderItem={({ item, index }) => (
          <TaskCard
            data={item}
            index={index}
            setChecked={setChecked}
            deleteItemFromList={deleteItemFromList}
          />
        )}
      />
      {/* Task Input View to type and add new task */}

      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.TextInput}
          multiline={true}
          cursorColor={colors.accent}
          placeholder="I want to..."
          placeholderTextColor={colors.text}
          onChangeText={(text) => {
            setValue({ text: text, isChecked: false });
          }}
          value={value.text}
        />
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => addTaskToList(value.text)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Screen Styles
const styles = StyleSheet.create({
  HomepageView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  title: {
    ...fonts.title_text,
    textAlign: "center",
  },
  listSetting: {
    opacity: 0.8,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  textInputWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    // marginBottom: 20,
    paddingHorizontal: 0,
    // marginHorizontal: 5,
    justifyContent: "space-around",
    backgroundColor: colors.accent,
  },
  TextInput: {
    ...shadow,
    borderRadius: sizes.borderRadius,
    backgroundColor: colors.white,
    height: 54,
    width: "80%",
    paddingLeft: 15,
    fontSize: sizes.h2,
    color: colors.text,
  },
  buttonWrapper: {
    backgroundColor: colors.primary,
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
export default Homepage;
