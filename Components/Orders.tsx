import React from "react";
import OrderItem from "./OrderItem";
import { useSession } from "next-auth/react";

const Orders = async ({ orders }: any) => {
  ////console.log(orders);
  return (
    <section className="lg:px-20 gap-x-8 px-5 max-w-screen-xl mx-auto py-10">
      <p className="text-3xl mb-5">Your Orders</p>
      {orders.map((order: any) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </section>
  );
};

export default Orders;
