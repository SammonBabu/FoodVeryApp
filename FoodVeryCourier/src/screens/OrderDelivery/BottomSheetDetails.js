import { useRef, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import styles from "./styles";
import { useOrderContext } from "../../contexts/OrderContext";

const STATUS_TO_TITLE = {
  READY_FOR_PICKUP: "Accept Order",
  ACCEPTED: "Pick-Up Order",
  PICKED_UP: "Complete Delivery",
};

const BottomSheetDetails = (props) => {
  const { totalKm, totalMinutes, onAccepted } = props;
  const isDriverClose = totalKm <= 0.1;

  const {
    order,
    user,
    dishes,
    acceptOrder,
    fetchOrder,
    completeOrder,
    pickUpOrder,
  } = useOrderContext();
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  const bottomSheetRef = useRef(null);

  const onButtonPressed = async () => {
    const { status } = order;
    if (status === "READY_FOR_PICKUP") {
      bottomSheetRef.current?.collapse();
      acceptOrder();
      onAccepted();
    }
    if (status === "ACCEPTED") {
      bottomSheetRef.current?.collapse();
     await pickUpOrder();
    }
    if (status === "PICKED_UP") {
      await completeOrder();
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const isButtonDisabled = () => {
    const { status } = order;
    if (status === "READY_FOR_PICKUP") {
      return false;
    }
    if ((status === "ACCEPTED" || status === "PICKED_UP") && isDriverClose) {
      return false;
    }
    return true;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <View style={styles.handleIndicatorContainer}>
        <Text style={styles.routeDetailsText}>
          {totalMinutes.toFixed(0)} min
        </Text>
        <FontAwesome5
          name="shopping-bag"
          size={30}
          color="#3FC060"
          style={{ marginHorizontal: 10 }}
        />
        <Text style={styles.routeDetailsText}>{totalKm.toFixed(2)} km</Text>
      </View>
      <View style={styles.deliveryDetailsContainer}>
        <Text style={styles.restaurantName}>{order.Restaurant.name}</Text>
        <View style={styles.adressContainer}>
          <Fontisto name="shopping-store" size={22} color="grey" />
          <Text style={styles.adressText}>{order.Restaurant.address}</Text>
        </View>

        <View style={styles.adressContainer}>
          <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
          <Text style={styles.adressText}>{user?.address}</Text>
        </View>

        <View style={styles.orderDetailsContainer}>
          {dishes?.map((dishItem) => (
            <Text style={styles.orderItemText} key={dishItem.id}>
              {dishItem.Dish.name} x{dishItem.quantity}
            </Text>
          ))}
        </View>
      </View>
      <Pressable
        style={{
          ...styles.buttonContainer,
          backgroundColor: isButtonDisabled() ? "grey" : "#3FC060",
        }}
        onPress={onButtonPressed}
        disabled={isButtonDisabled()}
      >
        <Text style={styles.buttonText}>{STATUS_TO_TITLE[order.status]}</Text>
      </Pressable>
    </BottomSheet>
  );
};

export default BottomSheetDetails;
