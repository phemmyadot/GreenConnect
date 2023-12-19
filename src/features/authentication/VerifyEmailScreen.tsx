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
import { Auth } from "aws-amplify";
import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerifyEmailScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const email = await AsyncStorage.getItem("email");
      const data = await Auth.confirmSignUp(email, verificationCode);
      console.log("User verified:", data);
      navigation.navigate("Login");
      // Add logic to navigate to the login screen after successful verification
    } catch (error) {
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
      style={globalStyles.backgroundImage}
    >
      <Overlay />
      <View style={globalStyles.content}>
        <Image
          source={require("../../../assets/logo.png")} // Import the logo
          style={globalStyles.logo} // Define logo styles
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleVerifyEmail}
        >
          <Text style={globalStyles.buttonText}>Verify Email</Text>
        </TouchableOpacity>
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

export default VerifyEmailScreen;
