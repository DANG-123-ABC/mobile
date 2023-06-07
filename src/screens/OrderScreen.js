import { Text, View, ScrollView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/orderContext";
import { auth } from "../../firebase";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
      console.log("res.data",res.data)
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, []);
  return (
    <SafeAreaView className="flex-1 w-full p-5 bg-white">
      <View>
        <Text className="font-bold text-xl">My Orders</Text>
      </View>

      <ScrollView className="mt-4 pt-4 " showsVerticalScrollIndicator={false}>
        {orders?.map((order) => (
          <OrderItem key={order.id} brand={order.brand} qty={order.qty} title={order.title} date={order.date} orderId={order.orderId} image={order.image} price={order.price}  />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
