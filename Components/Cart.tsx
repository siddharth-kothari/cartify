"use client";

import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const items = useSelector((state: any) => state.cart.items);

  return (
    <section className="lg:flex max-w-screen-2xl">
      <div className="flex-grow m-5 shadow-sm">
        <div className="flex flex-col p-5 space-y-10 bg-white">
          <h1 className="text-3xl border-b pb-3">
            {items.length === 0 ? "Your Cart is empty." : "Shopping Cart"}
          </h1>

          {items.map((item: any, index: number) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cart;
