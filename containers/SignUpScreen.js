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
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorSignUp("");
    if (password !== confirmPassword) {
      setErrorSignUp("Passwords must be the same");
    } else if (
      !email ||
      !username ||
      !description ||
      !password ||
      !confirmPassword
    ) {
      // console.log(email, username, description, password);
      setErrorSignUp("Please fill all fields");
    } else {
      try {
        const body = {
          email: email,
          username: username,
          description: description,
          password: password,
        };
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          body
        );
        alert("Sign Up successful");
        console.log("data :", response.data);
        if (response.data) {
          setToken(response.data.token);
        }
      } catch (error) {
        // console.log(error.response);
        if (error.response?.status === 400) {
          setErrorSignUp("Email and/or Username already use");
        } else {
          console.log("Mysterious error ?! :", error);
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.signupForm}>
        <View style={styles.topForm}>
          <Image
            style={styles.logo}
            source={require("../assets/airbnb-logo.png")}
          />
          <Text style={styles.titleForm}>Sign up</Text>
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
            value={username}
            placeholder="username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.fieldMultiline}
            value={description}
            placeholder="Describe yourself in a few words..."
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.field}
            value={password}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <TextInput
            style={styles.field}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={styles.bottomFrom}>
          {errorSignUp ? (
            <Text style={styles.errorSignUpText}>{errorSignUp}</Text>
          ) : (
            <Text style={styles.errorSignUpText}> </Text>
          )}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => {
              if (!isLoading) {
                handleSubmit();
              }
            }}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.noAccountButtonText}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    height: windowHeight * (2.3 / 10),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  fields: {
    width: "100%",
    height: windowHeight * (5.2 / 10),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    // backgroundColor: "blue",
  },
  bottomFrom: {
    width: "100%",
    height: windowHeight * (2.5 / 10),
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "green",
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
    marginBottom: 30,
    // backgroundColor: "yellow",
  },

  fieldMultiline: {
    textAlignVertical: "top",
    borderColor: "salmon",
    borderWidth: 2,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    marginBottom: 30,
    marginTop: 15,
    height: 85,
  },
  // Bottom
  signUpButton: {
    color: "yellow",
    borderWidth: 3,
    borderColor: "salmon",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },

  signUpButtonDisable: {
    color: "blue",
    borderWidth: 3,
    borderColor: "gray",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  signUpButtonText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "500",
  },
  noAccountButtonText: {
    color: "gray",
    marginTop: "5%",
  },
  errorSignUpText: {
    color: "salmon",
    marginBottom: "5%",
  },
});
