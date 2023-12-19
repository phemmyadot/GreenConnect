import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../features/authentication/LoginScreen";
import RegisterScreen from "../features/authentication/RegisterScreen";
import ForgotPasswordScreen from "../features/authentication/ForgotPasswordScreen";
import VerifyEmailScreen from "../features/authentication/VerifyEmailScreen";
import ResetPasswordScreen from "../features/authentication/ResetPasswordScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyEmail: { email: string };
  ResetPassword: { email: string };
};
const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        initialParams={{ email: "user.email" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        initialParams={{ email: "user.email" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
