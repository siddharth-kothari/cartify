import Cart from "@/Components/Cart";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Cartify",
  description: "",
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
