"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  count: number;
}

const initialState: CartState = {
  items: [],
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      state.items = [...state.items, action.payload];
      state.count = state.items.length;
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.count = state.items.length;
      saveCartToLocalStorage(state.items);
    },
    loadCartFromLocalStorage: (state) => {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedCart = localStorage.getItem("cart");
        state.items = storedCart ? JSON.parse(storedCart) : [];
        state.count = state.items.length;
      }
    },
  },
});

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
};

export const selectItems = (state: any) => state.cart.items;

export const { addToCart, removeFromCart, loadCartFromLocalStorage } =
  cartSlice.actions;
export default cartSlice.reducer;
