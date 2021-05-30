import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Color from "../constants/Color";
import { baseUrl, url } from "../constants/BaseUrl";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import RegularLoading from "../components/RegularLoading";
import { UserContext } from "../context/UserContext";

function YourCollabs({ navigation, route }) {
  const [collabs, setCollabs] = useState([]);
  const { usercon, setUsercon } = useContext(UserContext);

  useEffect(() => {
    //console.log(usercon);

    getCollabs();
  }, []);

  const getCollabs = async () => {
    const api = await `${url}api/collabovid/${usercon._id}`;
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      //console.log(res);
      if ((await response.status) === 201) {
        await setCollabs(res);
        //setLoading(false);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert("Could not retrieve Collabs. Please try again.");
      //setLoading(false);
      return false;
    }
  };
  return (
    <View style={stylesH.container}>
      <StatusBar backgroundColor={Color.primary} />
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          {collabs.map((collab) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "black",
                width: width * 0.95,
                height: height * 0.25,
                backgroundColor: Color.white,
                borderRadius: 10,
              }}
              key={collab._id}
            >
              <Text style={{ alignSelf: "center" }}>
                {collab.req_description} hHAHAHAHAH
              </Text>
              <Text>HAHAHA</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text>HAHAHAHAHAH</Text>
        </View>
      </ScrollView>
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

export default YourCollabs;
