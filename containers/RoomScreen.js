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

import { useState, useEffect } from "react";

export default function RoomScreen() {
  const route = useRoute();
  console.log(route);
  return <Text> oui</Text>;
}
