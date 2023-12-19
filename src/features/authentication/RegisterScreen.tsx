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

import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";
import authProvider from "./auth";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { DisabledButton, PrimaryButton } from "../../components/Buttons";

const validateEmail = (input: string): boolean => {
  var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

type Props = StackScreenProps<AuthStackParamList, "Register">;
const RegisterScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    try {
      console.log("User registered:", email, password);
      await authProvider.signUp(email, password, fullName);
      navigation.navigate("VerifyEmail", { email: email });
    } catch (error: Error | any) {
      setError(error.message);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (
    _fullName?: string,
    _email?: string,
    _passwordValid?: boolean | null,
    _emailValid?: boolean | null
  ) => {
    _fullName = _fullName ?? fullName;
    _email = _email ?? email;
    _passwordValid = _passwordValid ?? passwordValid;
    _emailValid = _emailValid ?? emailValid;

    if (_fullName && _email && _passwordValid && _emailValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password.length < 8) {
      if (password.length === 0) {
        setPasswordValid(null);
      } else {
        setPasswordValid(false);
      }
      validateForm(undefined, undefined, false, undefined);
    } else {
      setPasswordValid(true);
      if (password && confirmPassword) {
        if (password === confirmPassword) {
          setPasswordMatch(true);
          validateForm(undefined, undefined, true, undefined);
        } else {
          setPasswordMatch(false);
          validateForm(undefined, undefined, false, undefined);
        }
      } else {
        setPasswordMatch(null);
        validateForm(undefined, undefined, false, undefined);
      }
    }
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    if (email.length > 0) {
      setEmailValid(validateEmail(email));
    } else {
      setEmailValid(null);
    }
    validateForm(undefined, email, undefined, validateEmail(email));
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    validatePasswordMatch(password, confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    validatePasswordMatch(password, confirmPassword);
  };

  const handleFullNameChange = (fullName: string) => {
    setFullName(fullName);
    console.log(fullName);

    validateForm(fullName, undefined, undefined, undefined);
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
          placeholder="Full Name"
          value={fullName}
          onChangeText={handleFullNameChange}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailValid === false && (
          <Text style={globalStyles.errorText}>
            Please enter a valid email address.
          </Text>
        )}
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {passwordMatch === false && (
          <Text style={globalStyles.errorText}>
            Passwords do not match. Please try again.
          </Text>
        )}
        {passwordValid === false && (
          <Text style={globalStyles.errorText}>
            Password must be at least 8 characters long.
          </Text>
        )}
        {formValid && (
          <PrimaryButton
            text="Register"
            onPressed={handleRegister}
          ></PrimaryButton>
        )}
        {!formValid && <DisabledButton text="Register"></DisabledButton>}
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
