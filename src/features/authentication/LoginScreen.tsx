import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { globalStyles } from "../../themes/styles";
import Overlay from "../../components/Overlay";
import authProvider from "./auth";
import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { PrimaryButton } from "../../components/Buttons";

type Props = StackScreenProps<AuthStackParamList, "Login">;
const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    // Add logic to handle user login
    setLoading(true);
    try {
      // Add logic to navigate to the next screen after successful login
      const user = await authProvider.signIn(email, password);
      console.log("User logged in:", user);
    } catch (error: Error | any) {
      // Handle login error
      setError(error.message);
      setModalVisible(true); // Show the error modal
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")} // Provide the path to your background image
      style={[globalStyles.backgroundImage, globalStyles.container]}
    >
      <Overlay />
      <View style={globalStyles.content}>
        <Image
          source={require("../../../assets/logo.png")} // Import the logo
          // @ts-expect-error TS(2769): No overload matches this call.
          style={globalStyles.logo} // Define logo styles
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <PrimaryButton text="Login" onPressed={handleLogin}></PrimaryButton>
        <View style={globalStyles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={globalStyles.linkText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={globalStyles.linkText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        {loading && <Loader />}
        <ErrorModal
          visible={modalVisible}
          message={error}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
