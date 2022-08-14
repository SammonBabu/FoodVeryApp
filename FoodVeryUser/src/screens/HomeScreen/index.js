import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import Searchbar from "../../components/SearchbarItem";

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("Kanjirappally");
  const [region, setRegion] = useState({
    latitude: 9.560868700000002,
    longitude: 76.8112239,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log(region, city);
  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  return (
    <View style={styles.page}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <Searchbar
          cityHandler={setCity}
          regionHandler={setRegion}
          region={region}
        />
      </View>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    marginBottom: 100,
  },
});
