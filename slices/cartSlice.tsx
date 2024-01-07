"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  desc?: string;
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
          toast.success("Product quantity updated!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          existingItem.qty += action.payload.qty;
          toast.success("Product quantity updated!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        state.items.push({ ...action.payload, qty: action.payload.qty });
        toast.success("Product added to cart!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      state.count = state.items.length;
      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.count = state.items.length;
      saveCartToLocalStorage(state.items);

      toast.success("Product removed from cart!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      toast.success("Product quantity increased!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      toast.success("Product quantity decreased!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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

const showAddToCartToast = () => ({
  type: "SHOW_ADD_TO_CART_TOAST",
});

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
};

// const dispatch = useDispatch();

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
