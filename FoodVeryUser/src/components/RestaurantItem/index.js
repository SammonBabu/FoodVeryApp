import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg";

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Restaurant", { id: restaurant?.id });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.restaurantContainer}
    >
      <View style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}>
        <Image
          source={{
            uri: restaurant.image.startsWith("http")
              ? restaurant.image
              : DEFAULT_IMAGE,
          }}
          style={styles.image}
        />
        <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
          <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}>
              ₹ {restaurant.deliveryFee.toFixed(0)} &#8226;{" "}
              {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} minutes
            </Text>
          </View>

          <View style={styles.rating}>
            <Text>{restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurantContainer: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 13,
    color: "gray",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rating: {
    backgroundColor: "#eee",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
