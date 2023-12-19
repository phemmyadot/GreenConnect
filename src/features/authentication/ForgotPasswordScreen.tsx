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

type Props = StackScreenProps<AuthStackParamList, "ForgotPassword">;
const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      await authProvider.forgotPassword(email);
      console.log("Reset code sent successfully");
      navigation.navigate("ResetPassword", { email: email });
      // Add logic to navigate to the reset password screen
    } catch (error) {
      // Handle login error
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleForgotPassword}
        >
          <Text style={globalStyles.buttonText}>Send Reset Email</Text>
        </TouchableOpacity>
        <View style={globalStyles.linksContainer}>
          <Text style={globalStyles.linkText}>Remember your password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[globalStyles.linkText]}>Login</Text>
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

export default ForgotPasswordScreen;
