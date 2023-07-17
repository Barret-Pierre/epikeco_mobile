import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "./screens/Dashboard";
import { Signin } from "./screens/Signin";
import { Signup } from "./screens/Signup";

const Stack = createStackNavigator();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default Router;
