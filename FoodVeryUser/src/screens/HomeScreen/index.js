import { DataStore } from "aws-amplify";
import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { Restaurant } from "../../models";

export default function HomeScreen() {
  const [restaurants, setRestuarants] = useState([]);

  // const fetchRestuarants = async () => {
  //   const results = await DataStore.query(Restaurant);
  //   setRestuarants(results);
  // };

  useEffect(() => {
    // DataStore.query(Restaurant).then((results) => setRestuarants(results));
    DataStore.query(Restaurant).then(setRestuarants);
  }, []);
  return (
    <View style={styles.page}>
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
  },
});
