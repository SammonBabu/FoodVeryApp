import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
  },
});
