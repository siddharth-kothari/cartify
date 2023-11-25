"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import AuthProvider from "./AuthProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </ReduxProvider>
  );
};

export default Provider;
