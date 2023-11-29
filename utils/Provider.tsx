"use client";

import React, { useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import AuthProvider from "./AuthProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <>
      {isHydrated ? (
        <>
          <ReduxProvider store={store}>
            <AuthProvider>{children}</AuthProvider>
          </ReduxProvider>
        </>
      ) : null}
    </>
  );
};

export default Provider;
