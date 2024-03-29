import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Courier, Order } from "../../models";
import { DataStore } from "aws-amplify";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";
import { Badge, Button } from "@rneui/themed";

const OrderLiveUpdates = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);

  const mapRef = useRef(null);
  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, []);

  useEffect(() => {
    if (order?.orderCourierId) {
      DataStore.query(Courier, order.orderCourierId).then(setCourier);
    }
  }, [order?.orderCourierId]);

  useEffect(() => {
    if (courier?.lng && courier?.lat) {
      mapRef.current.animateToRegion({
        latitude: courier.lat,
        longitude: courier.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [courier?.lng, courier?.lat]);

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setOrder(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = DataStore.observe(Courier, courier.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setCourier(msg.element);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [courier]);

  let statusToColor;
  if (order?.status === "DECLINED_BY_RESTAURANT") {
    statusToColor = "rgba(214, 61, 57, 1)";
  } else if (
    order?.status === "ACCEPTED" ||
    order?.status === "PICKED_UP" ||
    order?.status === "READY_FOR_PICKUP" ||
    order?.status === "COOKING"
  ) {
    statusToColor = "rgba(255, 193, 7, 1)";
  } else {
    statusToColor = "rgba(127, 220, 103, 1)";
  }
  

  return (
    <View>
      <Button
        title={order?.status || "loading"}
        buttonStyle={{ backgroundColor: statusToColor }}
        containerStyle={{
          width: "100%",
          margin: 5,
        }}
        titleStyle={{ color: "white", marginHorizontal: 20 }}
      />
      <MapView style={styles.map} ref={mapRef} showsUserLocation>
        {courier?.lat && (
          <Marker
            coordinate={{ latitude: courier.lat, longitude: courier.lng }}
          >
            <View
              style={{
                padding: 5,
                backgroundColor: "green",
                borderRadius: 40,
                borderWidth: 3,
                borderColor: "black",
              }}
            >
              <FontAwesome5 name="motorcycle" size={24} color="white" />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default OrderLiveUpdates;
