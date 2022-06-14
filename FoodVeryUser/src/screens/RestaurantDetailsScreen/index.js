import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import restaurants from "../../../assets/data/restaurants.json";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { Restaurant, Dish } from "../../models";
import { DataStore } from "aws-amplify";

DEFAULT_IMAGE =
  "https://im1.dineout.co.in/images/uploads/misc/2017/Mar/31/empty-resto.jpg";

const RestaurantDetailsPage = () => {
  const [restaurant, setRestaurants] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;
  useEffect(() => {
    if (id) {
      // DataStore.query(Restaurant).then((results) => setRestuarants(results));
      DataStore.query(Restaurant, id).then(setRestaurants);
      DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
        setDishes
      );
    }
  }, [id]);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
};

export default RestaurantDetailsPage;
