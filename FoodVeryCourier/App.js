import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import AuthContextProvider from "./src/contexts/AuthContext";
import OrderContextProvider from "./src/contexts/OrderContext";
import GlobalStyles from "./src/GlobalStyles";

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <OrderContextProvider>
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
              <Navigation />
            </SafeAreaView>
          </OrderContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
