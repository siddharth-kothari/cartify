import Image from "next/image";
import React from "react";
import { loading } from "@/assets";

const Loading = () => {
  return (
    <div className="h-screen w-screen grid place-content-center fixed top-0 z-50 bg-black opacity-80">
      <Image alt="loading..." src={loading} className="!opacity-100" />
    </div>
  );
};

export default Loading;
