import Login from "@/Components/Login";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Cartify",
  description: "",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
