import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/DashboardScreen";

type ProtectedStackParamList = {
  Dashboard: undefined;
};

const Stack = createStackNavigator<ProtectedStackParamList>();

const ProtectedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default ProtectedStack;
