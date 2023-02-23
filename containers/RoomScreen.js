import { useNavigation, useRoute } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Swiper from "react-native-swiper";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const RoomScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.id}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.loadingPage}>
      <ActivityIndicator size={"large"} color="salmon" />
    </View>
  ) : (
    <ScrollView style={styles.pageContainer}>
      <Swiper style={styles.wrapper} autoplay>
        {data.photos.map((slide) => {
          return (
            <View style={styles.slide}>
              <Image
                source={{ uri: slide.url }}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          );
        })}
      </Swiper>
      <Text style={styles.price}>{`${data.price} €`}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.roomCardText}>
          <Text numberOfLines={1} style={styles.roomTitle}>
            {data.title}
          </Text>
          <View style={styles.ratesContainer}>
            {data.ratingValue >= 1 ? (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#FDCC0D"
              />
            ) : (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#A9A9A9"
              />
            )}
            {data.ratingValue >= 2 ? (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#FDCC0D"
              />
            ) : (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#A9A9A9"
              />
            )}
            {data.ratingValue >= 3 ? (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#FDCC0D"
              />
            ) : (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#A9A9A9"
              />
            )}
            {data.ratingValue >= 4 ? (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#FDCC0D"
              />
            ) : (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#A9A9A9"
              />
            )}
            {data.ratingValue >= 5 ? (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#FDCC0D"
              />
            ) : (
              <FontAwesome
                style={styles.starRate}
                name="star"
                size={24}
                color="#A9A9A9"
              />
            )}
            <Text style={styles.reviewsQuantity}>{`${data.reviews} review${
              data.reviews > 1 && "s"
            }`}</Text>
          </View>
        </View>
        <View style={styles.profilePictureUserContainer}>
          <Image
            source={{ uri: data.user.account.photo.url }}
            style={styles.profilePictureUser}
          ></Image>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <MapView
        // La MapView doit obligatoirement avoir des dimensions
        style={{ marginTop: "10%", width: "100%", height: 300 }}
        initialRegion={{
          latitude: 48.864716,
          longitude: 2.349014,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title={data.title}
          description={data.description}
        />
      </MapView>
    </ScrollView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsContainer: {
    paddingHorizontal: "5%",
    marginTop: 5,
    // backgroundColor: "yellow",
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  roomTitle: {
    fontSize: 20,
  },
  ratesContainer: {
    marginTop: "5%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  reviewsQuantity: {
    color: "#A9A9A9",
    marginLeft: "3%",
  },

  starRate: {
    marginRight: 5,
  },

  roomCardText: {
    width: "75%",
  },
  profilePictureUserContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
  },
  profilePictureUser: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },

  descriptionContainer: {
    paddingHorizontal: "5%",
  },
  wrapper: {
    height: 250,
    resizeMode: "contain",
    justifyContent: "flex-end",
    backgroundColor: "salmon",
  },
  slide: {
    height: 300,
  },

  price: {
    position: "absolute",
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    width: "20%",
    textAlign: "center",
    top: "20%",
  },
});
