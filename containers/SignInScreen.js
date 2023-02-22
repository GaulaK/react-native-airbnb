import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

const windowHeight = Dimensions.get("window").height;

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("test@gaulak.fr");
  const [password, setPassword] = useState('test&é"');
  const [errorSignIn, setErrorSignIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorSignIn("");
    if (!email || !password) {
      setErrorSignIn("Please fill all fields");
    } else {
      try {
        const body = { email: email, password: password };
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          body
        );
        console.log(response.data);
        if (response.data) {
          setToken(response.data.token);
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorSignIn("Email or password is incorrect");
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.signupForm}>
        <View style={styles.topForm}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb-logo.png")}
          />
          <Text style={styles.titleForm}>Sign in</Text>
        </View>
        <View style={styles.fields}>
          <TextInput
            style={styles.field}
            value={email}
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.field}
            value={password}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.bottomFrom}>
          {errorSignIn ? (
            <Text style={styles.errorSignInText}>{errorSignIn}</Text>
          ) : (
            <Text style={styles.errorSignInText}> </Text>
          )}
          <TouchableOpacity
            style={
              !isLoading ? styles.signInButton : styles.signInButtonDisable
            }
            onPress={() => {
              if (!isLoading) {
                handleSubmit();
              }
            }}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.noAccountButtonText}>
              No account ? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  signupForm: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    height: windowHeight,
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },

  // Container
  topForm: {
    width: "100%",
    height: windowHeight / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  fields: {
    width: "100%",
    height: windowHeight / 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  bottomFrom: {
    width: "100%",
    height: windowHeight / 3,
    justifyContent: "center",
    alignItems: "center",
  },

  // Top
  logo: {
    width: "100%",
    height: "40%",
    resizeMode: "contain",
  },
  titleForm: {
    marginTop: "5%",
    color: "gray",
    fontSize: 25,
    fontWeight: "bold",
  },
  // Fields

  field: {
    borderBottomColor: "salmon",
    borderBottomWidth: 2,
    width: "100%",
    paddingVertical: 5,
    fontSize: 15,
    marginTop: 30,
  },
  // Bottom
  signInButton: {
    borderWidth: 3,
    borderColor: "salmon",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  signInButtonDisable: {
    borderWidth: 3,
    borderColor: "gray",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  signInButtonText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "500",
  },
  noAccountButtonText: {
    color: "gray",
    marginTop: "5%",
  },
  errorSignInText: {
    color: "salmon",
    marginBottom: "5%",
  },
});
