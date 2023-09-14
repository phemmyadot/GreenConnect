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

const VerifyEmailScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerifyEmail = () => {
    // Add logic to handle email verification
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
      </View>
    </ImageBackground>
  );
};

export default VerifyEmailScreen;
