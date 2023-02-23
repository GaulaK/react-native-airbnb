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
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

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

  console.log(data);
  // console.log(data.photos[0].url);
  // console.log(route.params);

  return isLoading ? (
    <View style={styles.loadingPage}>
      <ActivityIndicator size={"large"} color="salmon" />
    </View>
  ) : (
    <ScrollView style={styles.pageContainer}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: data.photos[0].url }}
          style={styles.imageCard}
          resizeMode="cover"
        >
          <Text style={styles.price}>{`${data.price} €`}</Text>
        </ImageBackground>
      </View>
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
  imageContainer: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    justifyContent: "flex-end",
    backgroundColor: "salmon",
  },
  imageCard: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  price: {
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    width: "30%",
    textAlign: "center",
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
});
