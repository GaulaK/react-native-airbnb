import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const AroundMeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        let response;

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          //   console.log(location.coords.latitude, location.coords.longitude);
          response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          // get data around Paris
          response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${48.864716}&longitude=${2.349014}`
          );
        }

        const AroundMeTab = [];

        for (let i = 0; i < response.data.length; i++) {
          AroundMeTab.push({
            latitude: response.data[i].location[1],
            longitude: response.data[i].location[0],
            id: response.data[i]._id,
          });
        }

        setData(AroundMeTab);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getLocationAndData();
  }, []);

  return isLoading ? (
    <View style={styles.pageContainer}>
      <ActivityIndicator size={"large"} color="salmon" />
    </View>
  ) : (
    <View style={styles.pageContainer}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        {data.map((item, index) => {
          return (
            <Marker
              onPress={() => {
                navigation.navigate("Room", {
                  id: item.id,
                });
              }}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
});
