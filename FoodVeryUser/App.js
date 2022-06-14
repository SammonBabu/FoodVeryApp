import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RootNavigator from "./src/navigation";

import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />

      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
