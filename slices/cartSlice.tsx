"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  qty: number;
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
    getItemQuantity: (state, action) => {},

    addToCart: (state, action: PayloadAction<any>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (action.payload.qty > 1) {
          existingItem.qty += action.payload.qty;
        } else {
          existingItem.qty += 1;
        }
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }

      state.count = state.items.length;
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.count = state.items.length;
      saveCartToLocalStorage(state.items);
    },

    increaseQTY: (state, action) => {
      const itemToIncrease = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToIncrease) {
        itemToIncrease.qty += 1;
      }
      state.count = state.items.length;
      saveCartToLocalStorage(state.items);
    },

    decreaseQTY: (state, action) => {
      const itemToDecrease = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToDecrease) {
        itemToDecrease.qty -= 1;
        if (itemToDecrease.qty === 0) {
          // Remove the item if the quantity becomes zero
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
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
export const selectTotal = (state: any) =>
  state.cart.items.reduce((total: number, cartItem: any) => {
    const item = state.cart.items.find((i: any) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.qty;
  }, 0);

export const {
  addToCart,
  removeFromCart,
  loadCartFromLocalStorage,
  increaseQTY,
  decreaseQTY,
} = cartSlice.actions;
export default cartSlice.reducer;
