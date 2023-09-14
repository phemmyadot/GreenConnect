import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { globalStyles } from "../../themes/styles";
import Overlay from "../../components/Overlay";
import { Auth } from "aws-amplify";
import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = async () => {
    // Add logic to handle user registration
    setLoading(true);
    try {
      const user = await Auth.signUp({
        username: email,
        password,
      });
      console.log("User registered:", user);
      navigation.navigate("Verify");
      // Add logic to navigate to the verification screen
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
        <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
          <Text style={globalStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={globalStyles.linksContainer}>
          <Text style={globalStyles.linkText}>Already have an account?</Text>
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

export default RegisterScreen;
