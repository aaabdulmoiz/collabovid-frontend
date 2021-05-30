import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Color from "../constants/Color";
import styles from "../constants/styles";
import AnimatedLoader from "react-native-animated-loader";

const RequestLoading = (props) => {
  return (
    <View
      style={[
        stylesH.container,
        {
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
        },
      ]}
    >
      <AnimatedLoader
        visible={props.visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../assets/loader.json")}
        animationStyle={stylesH.lottie}
        speed={1}
      >
        <Text>Sending Request...</Text>
      </AnimatedLoader>
    </View>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const stylesH = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: width * 0.9,
    height: height * 0.075,
    borderColor: "#e6e3e3",
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default RequestLoading;
