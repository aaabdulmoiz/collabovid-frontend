import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Alert,
  AsyncStorage,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import { UserContext } from "../context/UserContext";

function HomePage({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { usercon, setUsercon } = useContext(UserContext);

  useEffect(() => {
    async function initializeUser() {
      //console.log("route is", route.params);
      await setUserInfo(route.params.res);
      //await setUsercon(route.params.res);
      setLoading(false);
      // console.log("conetext is", usercon);
    }

    initializeUser();

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  // useEffect(() => {

  // }, [userInfo]);

  const handleBackButtonClick = () => {
    Alert.alert("Collabovid", "Do you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
    return true;
  };

  if (!loading) {
    return (
      <View style={[stylesH.container, { backgroundColor: Color.background }]}>
        <StatusBar backgroundColor={Color.primary} />
        <View>
          <ImageBackground
            style={stylesH.card_view}
            source={require("../assets/images/shake.png")}
          ></ImageBackground>
          <View style={{ marginTop: height * 0.05, alignSelf: "center" }}>
            {/* <Text>Welcome {userInfo.name}</Text> */}
            <View>
              {userInfo !== null && <Text>Welcome {usercon.name}</Text>}
              <TouchableOpacity
                style={stylesH.helpButton}
                onPress={() => {
                  navigation.navigate("Ask for Help");
                }}
              >
                <View style={stylesH.buttonView}>
                  <Text style={stylesH.buttonText}>Ask for help</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: height * 0.03 }}>
              <TouchableOpacity
                style={stylesH.helpButton}
                onPress={() => navigation.navigate("Help Someone")}
              >
                <View style={stylesH.buttonView}>
                  <Text style={stylesH.buttonText}>Help Someone</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
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
        <ActivityIndicator
          color={Color.primary}
          size="large"
        ></ActivityIndicator>
      </View>
    );
  }
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
  card_view: {
    borderRadius: 5,
    height: height * 0.27,
    width: "100%",
    alignSelf: "center",
    backgroundColor: Color.primary,
  },
  helpButton: {
    height: height * 0.1,
    width: width * 0.95,
    backgroundColor: Color.white,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "left",
    fontSize: 18,
    color: Color.text,
    marginLeft: width * 0.03,
  },
  buttonView: {
    marginTop: height * 0.03,
  },
});

export default HomePage;
