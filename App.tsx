import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./src/navigation/AuthStack"; // Create this file to handle authentication flow
import { useFonts } from "expo-font";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import ProtectedStack from "./src/navigation/ProtectedStack";
import { Provider } from "react-redux";
import { store } from "./src/features/app/store";
import { HubCallback } from "@aws-amplify/core/lib/Hub";

Amplify.configure(awsconfig);

type RootStackParamList = {
  ProtectedStack: undefined;
  AuthStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const authData = await Auth.currentAuthenticatedUser();
        setUser(authData);
      } catch (err) {
        setUser(null);
      }
    };

    checkAuthState(); // Check authentication state on app load

    const listener = (data: any) => {
      switch (data.payload.event) {
        case "signIn":
        case "signUp":
          checkAuthState(); // Update auth state on sign in or sign up
          break;
        case "signOut":
          setUser(null); // Update auth state on sign out
          break;
        default:
          break;
      }
    };

    const subscription = Hub.listen("auth", listener);

    return () => {
      subscription();
    };
  }, []);

  if (!fontsLoaded && !fontError) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="ProtectedStack" component={ProtectedStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
          {/* Add more screens here if needed */}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
