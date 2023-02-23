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

import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

const image = { uri: "https://reactjs.org/logo-og.png" };
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation, route }) {
  // console.log(route);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
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
    <View style={styles.pageContainer}>
      <FlatList
        contentContainerStyle={{
          alignItems: "stretch",
          paddingHorizontal: "5%",
          marginTop: 15,
        }}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomCard}
            onPress={() => navigation.push("Room", { id: item._id })}
          >
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{ uri: item.photos[0].url }}
                style={styles.imageCard}
                resizeMode="cover"
              >
                <Text style={styles.price}>{`${item.price} €`}</Text>
              </ImageBackground>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.roomCardText}>
                <Text numberOfLines={1} style={styles.roomTitle}>
                  {item.title}
                </Text>
                <View style={styles.ratesContainer}>
                  {item.ratingValue >= 1 ? (
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
                  {item.ratingValue >= 2 ? (
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
                  {item.ratingValue >= 3 ? (
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
                  {item.ratingValue >= 4 ? (
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
                  {item.ratingValue >= 5 ? (
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
                  <Text style={styles.reviewsQuantity}>{`${
                    item.reviews
                  } review${item.reviews > 1 && "s"}`}</Text>
                </View>
              </View>
              <View style={styles.profilePictureUserContainer}>
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.profilePictureUser}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  roomCard: {
    borderBottomColor: "#A9A9A9",
    borderBottomWidth: 1,
    marginBottom: 20,
  },

  imageContainer: {
    backgroundColor: "salmon",
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
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

  imageCard: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },

  detailsContainer: {
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

  loadingPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
