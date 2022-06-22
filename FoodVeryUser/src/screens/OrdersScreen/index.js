import { View, Text, FlatList } from "react-native";

import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";
// import { useBasketContext } from "../../contexts/BasketContext";
//import orders from "../../../assets/data/orders.json";

const OrderScreen = () => {
  const {orders} = useOrderContext();
  // const {basketItem} = useBasketContext();
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;
