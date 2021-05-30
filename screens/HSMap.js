import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Animated,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import RegularLoading from "../components/RegularLoading";
import MapView, { Callout } from "react-native-maps";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserContext } from "../context/UserContext";
//import Animated from "react-native-reanimated";
import { baseUrl, url } from "../constants/BaseUrl";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

function HSMap({ navigation, route }) {
  const { usercon, setUsercon } = useContext(UserContext);
  const [bottom, setBottom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 24.9551,
    longitude: 67.0584,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });
  const [markers, setMarkers] = useState([]);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _MapReady = () => {
    setBottom(0);
    setLoading(false);
  };

  useEffect(() => {
    getRequestServer();
    console.log("Should run once");
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { region } = markers[index];
          _map.current.animateToRegion(
            { ...region, latitudeDelta: 0.05, longitudeDelta: 0.05 },
            350
          );
        }
      }, 10);
    });
  });

  const getRequestServer = async () => {
    const api = await `${url}api/request`;
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
        await setMarkers(res);
        setLoading(false);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert("Could not retrieve requests. Please try again.");
      setLoading(false);
      return false;
    }
  };

  const createCollab = async (marker) => {
    //console.log("the marker is ", marker);
    const check = await collabServer(marker);
    if (await check) {
      const secCheck = await updateReqServer(marker._id);
      if (await secCheck) {
        navigation.goBack();
      } else {
        alert("Request not updated");
      }
    } else {
      alert("Collab not Created.");
    }
  };

  const collabServer = async (marker) => {
    const api = await `${url}api/collabovid`;
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req_id: marker._id,
          req_category: marker.category,
          req_description: marker.description,
          req_payment: marker.payment,
          req_region: marker.region,
          requester_id: marker.requester_id,
          requester_name: marker.requester_name,
          requester_cell: marker.requester_cell,
          helper_id: usercon._id,
          helper_name: usercon.name,
          helper_cell: usercon.cell,
        }),
      });
      const res = await response.json();

      if ((await response.status) === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateReqServer = async (req_id) => {
    const i = "In Progress";
    const api = await `${url}api/request/update/Progress`;

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req_id: req_id,
        }),
      });

      const res = await response.json();

      if ((await response.status) === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _map = useRef(null);

  if (!loading) {
    return (
      <View style={stylesH.container}>
        <StatusBar backgroundColor={Color.primary} />
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={_map}
            style={[stylesH.map, { marginBottom: bottom }]}
            showsUserLocation={true}
            initialRegion={region}
            showsMyLocationButton={true}
            zoomEnabled={true}
            followsUserLocation={true}
            onMapReady={_MapReady}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.region.latitude,
                  longitude: marker.region.longitude,
                }}
                title={marker.category}
                description={marker.description}
              >
                <Animated.View style={[stylesH.markerWrap]}>
                  <Animated.Image
                    style={[stylesH.marker]}
                    resizeMode="cover"
                    source={require("../assets/images/marker.png")}
                  />
                </Animated.View>
              </Marker>
            ))}

            {/* <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="My Title"
              description="My Description"
            >
              <Animated.View style={[stylesH.markerWrap]}>
                <Animated.Image
                  style={[stylesH.marker]}
                  resizeMode="cover"
                  source={require("../assets/images/marker.png")}
                />
              </Animated.View>
            </Marker> */}
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={stylesH.scrollView}
            pagingEnabled
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal:
                Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: mapAnimation } } }],
              { useNativeDriver: true }
            )}
          >
            {markers.map((marker, index) => (
              <View style={stylesH.card} key={index}>
                <Image
                  source={require("../assets/images/banner.png")}
                  style={stylesH.cardImage}
                  resizeMode="cover"
                />
                <View style={stylesH.textContent}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text numberOfLines={1} style={stylesH.cardtitle}>
                      {marker.requester_name}
                    </Text>
                    <Text numberOfLines={1} style={stylesH.cardtitle}>
                      Cell: {marker.requester_cell}
                    </Text>
                  </View>

                  <Text numberOfLines={1} style={stylesH.cardDescription}>
                    {marker.description}
                  </Text>
                  <View style={stylesH.button}>
                    <TouchableOpacity
                      style={[
                        stylesH.signIn,
                        { borderColor: Color.primary, borderWidth: 1 },
                      ]}
                      onPress={createCollab.bind(this, marker)}
                    >
                      <Text
                        style={([stylesH.textSign], { color: Color.primary })}
                      >
                        Accept
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </View>
    );
  } else {
    return <RegularLoading />;
  }
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

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
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: height * 0.06,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HSMap;
