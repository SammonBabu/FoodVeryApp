import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import BasketDishItem from "../../components/BasketDishItem";
import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useStripe } from "@stripe/stripe-react-native";

const Basket = () => {
  const { restaurant, basketDishes, totalPrice } = useBasketContext();
  const { createOrder, orders } = useOrderContext();
  const navigation = useNavigation();

  const [resClientSecret, setClientSecret] = useState();
  const [newOrder, setNewOrder] = useState(null);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const amount = Math.floor(totalPrice * 100 || 0);
  const id = orders.id;

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    if (resClientSecret) {
      initializePaymentSheet();
    }
  }, [resClientSecret]);

  const fetchPaymentIntent = async () => {
    const response = await fetch(
      "https://7znq3lqfa3.execute-api.us-east-1.amazonaws.com/pay",
      {
        method: "POST",
        body: JSON.stringify({ amount, id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { clientSecret, message } = await response.json();
    console.log(clientSecret);
    setClientSecret(clientSecret);
  };

  const initializePaymentSheet = async () => {
    if (!resClientSecret) {
      return <ActivityIndicator size={"large"} color="gray" />;
    }
    const msg = await initPaymentSheet({
      paymentIntentClientSecret: resClientSecret,
      customFlow: false,
      merchantDisplayName: "FoodVery",
      merchantCountryCode: "IN",
    });
    if (msg?.error) {
      Alert.alert(error);
    }
  };

  const openPaymentSheet = async () => {
    if (!resClientSecret) {
      return <ActivityIndicator size={"large"} color="gray" />;
    }
    const { error } = await presentPaymentSheet({ resClientSecret });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      console.log("Success");
      // Alert.alert("Success", "Your payment is confirmed!");
      const newOrderDetails = await createOrder();
      Alert.alert("Success", "Your payment is confirmed!");
      setNewOrder(newOrderDetails);
    }
  };
  useEffect(() => {
    if (newOrder) {
      onCreateOrder();
    }
  }, [newOrder]);
  const onCreateOrder = async () => {
    if (!newOrder) {
      console.log("ActivityIndicator");
      return <ActivityIndicator size={"large"} color="gray" />;
    }
    navigation.navigate("Orders", {
      screen: "Order",
      params: { id: newOrder.id },
    });
  };
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your items
      </Text>

      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />
      <View style={styles.separator} />
      <View style={styles.row}>
        <Text style={{ fontWeight: "600" }}>Subtotal</Text>
        <Text style={{ marginLeft: "auto" }}>
          ₹ {totalPrice.toFixed(2) - restaurant?.deliveryFee.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{ fontWeight: "600" }}>Delivery</Text>
        <Text style={{ marginLeft: "auto" }}>₹ {restaurant?.deliveryFee}</Text>
      </View>
      <View style={styles.separator} />

      <Pressable onPress={openPaymentSheet} style={styles.button}>
        <Text style={styles.buttonText}>
          Create order &#8226; ₹ {totalPrice.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40, // temp fix
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    marginBottom: -20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default Basket;
