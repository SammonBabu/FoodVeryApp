import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: Platform.OS === "android" ? 35 : 0,
    flex: 1,
  },
});
