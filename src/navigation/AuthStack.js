// src/navigation/AuthStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../features/authentication/LoginScreen";
import RegisterScreen from "../features/authentication/RegisterScreen";
import ForgotPasswordScreen from "../features/authentication/ForgotPasswordScreen";
import VerifyEmailScreen from "../features/authentication/VerifyEmailScreen";
import ResetPasswordScreen from "../features/authentication/ResetPasswordScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
