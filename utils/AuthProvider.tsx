"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "./store";
import { loadCartFromLocalStorage } from "../slices/cartSlice";

export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  // Load cart from localStorage
  store.dispatch(loadCartFromLocalStorage());

  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
