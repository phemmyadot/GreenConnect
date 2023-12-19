import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import { globalStyles } from "../../themes/styles";
import authProvider from "./auth";
import Overlay from "../../components/Overlay";
import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = StackScreenProps<AuthStackParamList, "ResetPassword">;

const ResetPasswordScreen = ({ navigation, route }: Props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (!verificationCode || !newPassword) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const email = route.params?.email;
      if (!email) {
        throw new Error("Email not found");
      }
      authProvider.forgotPasswordSubmit(email, verificationCode, newPassword);
      navigation.navigate("Login");
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
        <TextInput
          style={globalStyles.input}
          placeholder="Verification Code"
          secureTextEntry
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleResetPassword}
        >
          <Text style={globalStyles.buttonText}>Reset Password</Text>
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

export default ResetPasswordScreen;
