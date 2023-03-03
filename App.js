// import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Homepage, Listpage } from "./src/screens";

SplashScreen.preventAutoHideAsync();

// Import Fonts
export default function App() {
  const [fontsLoaded] = useFonts({
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Hind-Light": require("./assets/fonts/Hind-Light.ttf"),
  });

  // Function to apply fonts once loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.SafeAreaView} onLayout={onLayoutRootView}>
      <Homepage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
