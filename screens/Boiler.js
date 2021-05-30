import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import RegularLoading from "../components/RegularLoading";

function Boiler({ navigation, route }) {
  return (
    <View style={stylesH.container}>
      <StatusBar backgroundColor={Color.primary} />
      <View></View>
    </View>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const stylesH = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  input: {
    width: width * 0.9,
    height: height * 0.075,
    borderColor: "#e6e3e3",
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default Boiler;
