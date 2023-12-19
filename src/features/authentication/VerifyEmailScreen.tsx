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
import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";
import authProvider from "./auth";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = StackScreenProps<AuthStackParamList, "VerifyEmail">;
const VerifyEmailScreen = ({ navigation, route }: Props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const email = route.params?.email;
      if (!email) {
        throw new Error("Email not found");
      }
      const data = await authProvider.confirmSignUp(email, verificationCode);
      console.log("User verified:", data);
      navigation.navigate("Login");
      // Add logic to navigate to the login screen after successful verification
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
