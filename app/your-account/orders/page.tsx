import Orders from "@/Components/Orders";
import { getServerSession } from "next-auth";
import React from "react";
import { getOrders } from "@/utils/OrderItems";

const OrdersPage = async () => {
  const session = await getServerSession();

  const orders = await getOrders(session?.user.email);

  return <Orders orders={orders} />;
};

export default OrdersPage;
