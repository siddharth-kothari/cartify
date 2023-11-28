"use client";

import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { selectItems, selectTotal } from "@/slices/cartSlice";

const Cart = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const { data: session } = useSession();
  const router = useRouter();

  const handleCartCheckout = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <section className="md:flex max-w-screen-2xl mx-auto md:px-20">
      <div className="flex m-5 shadow-sm md:w-[75%]">
        <div className="flex flex-col p-5 space-y-10 bg-white w-full">
          <h1 className="text-3xl border-b pb-3">
            {items.length === 0 ? "Your Cart is empty." : "Shopping Cart"}
          </h1>

          {items.map((item: any, index: number) => (
            <CartItem item={item} key={index} />
          ))}
          {items.length > 0 && (
            <p className="text-md font-light !mt-1 text-right">
              Subtotal ({items.length}
              {items.length === 1 ? " item" : " items"}) : ₹ {total * 80}
            </p>
          )}
        </div>
      </div>

      {items.length > 0 && (
        <div className="flex flex-col shadow-md p-5 bg-white m-5 md:my-5 md:ml-0 md:mr-5 h-max md:w-[25%]">
          <p className="text-md font-light !mt-1">
            Subtotal ({items.length}
            {items.length === 1 ? " item" : " items"}) : ₹ {total * 80}
          </p>

          <button className="button mt-3" onClick={handleCartCheckout}>
            Proceed to Buy
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
