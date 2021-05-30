import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import marker from "../assets/images/marker.png";
import { baseUrl, url } from "../constants/BaseUrl";
import { UserContext } from "../context/UserContext";
import RegularLoading from "../components/RegularLoading";

function AFHMap({ navigation, route }) {
  const [coordinates, setCoordinates] = useState({
    region: {
      latitude: 24.9551,
      longitude: 67.0584,
      latitudeDelta: 20,
      longitudeDelta: 20,
    },
  });
  const [loading, setLoading] = useState(true);
  const [anLoading, setAnLoading] = useState(false);
  const [bottom, setBottom] = useState(1);
  const mapRef = useRef(null);
  const { usercon, setUsercon } = useContext(UserContext);

  const _MapReady = () => {
    setBottom(0);
    setLoading(false);
  };

  useEffect(() => {
    currentLocation();
  }, []);

  // useEffect(() => {
  //   mapRef.current.animateToRegion(coordinates.region, 1000);
  // }, [coordinates]);

  const sendRequest = async () => {
    setAnLoading(true);
    const userInfo = { ...usercon, region: coordinates.region };
    console.log("the object is ", userInfo);

    sendRequestServer(userInfo);
  };

  const sendRequestServer = async (userInfo) => {
    const api = await `${url}api/request`;
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          requester_id: userInfo._id,
          requester_name: userInfo.name,
          requester_cell: userInfo.cell,
          region: userInfo.region,
          description: userInfo.description,
          category: userInfo.category,
          payment: userInfo.payment,
        }),
      });
      const res = await response.json();
      //console.log(res);
      if ((await response.status) === 201) {
        navigation.navigate("HomePage");
      } else {
        alert(res.message);
        setAnLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert("Could not send Request. Please try again.");
      setAnLoading(false);
      return false;
    }
  };

  async function currentLocation() {
    await navigator.geolocation.getCurrentPosition(
      async (position) =>
        await setCoordinates({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.033,
          },
        })
    );

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }

  async function centerCoordinates(region) {
    await setCoordinates({
      //works when user moves the map
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });
  }

  if (!loading && !anLoading) {
    return (
      <View style={stylesH.container}>
        <StatusBar backgroundColor={Color.primary} />
        <View>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={[stylesH.map, { marginBottom: bottom }]}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onMapReady={_MapReady}
            onRegionChangeComplete={centerCoordinates}
            zoomEnabled={true}
            followsUserLocation={true}
            initialRegion={{
              latitude: coordinates.region.latitude,
              longitude: coordinates.region.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* <MapViewDirections
              origin={coordinates.region}
              destination={{
                latitude: coordinates.region.latitude + 2,
                longitude: coordinates.region.longitude + 1,
              }}
              apikey="AIzaSyC4nR3FoULLvqZzhhaHYaT6hqbZEd2cOds"
              strokeWidth={3}
              strokeColor="hotpink"
            /> */}
            {/* <Marker
              draggable={true}
              coordinate={{
                latitude: coordinates.region.latitude,
                longitude: coordinates.region.longitude,
              }}
              title={"Your Location"}
            ></Marker> */}
          </MapView>
          <View style={stylesH.markerFixed}>
            <Image style={stylesH.marker} source={marker} />
          </View>
          <View style={stylesH.buttonFixed}>
            <TouchableOpacity style={styles.goAround} onPress={sendRequest}>
              <View style={styles.goButton}>
                <Text style={styles.buttonText}>GO</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else if (loading && !anLoading) {
    return <RegularLoading />;
  } else if (anLoading) {
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
          visible={anLoading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../assets/loader.json")}
          animationStyle={stylesH.lottie}
          speed={1}
        >
          <Text>Sending Request...</Text>
        </AnimatedLoader>
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -40,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  buttonFixed: {
    position: "absolute",
    bottom: height * 0.07,
    alignSelf: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default AFHMap;
