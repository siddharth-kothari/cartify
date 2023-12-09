"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const ThankYou = ({ orderno, status }: any) => {
  const router = useRouter();
  return (
    <section className="my-20 flex flex-col items-center justify-center w-full space-y-5">
      {status == "SUCCESS" && (
        <>
          <CheckCircleIcon className="w-28 h-28 text-black" />
          <p className="text-4xl">Thank You !!</p>
          <p className="text-2xl">
            Your order <span className="font-bold">#{orderno}</span> has been
            successfully placed.
          </p>
        </>
      )}

      {status == "FAILED" && (
        <>
          <XCircleIcon className="w-28 h-28 text-black" />
          <p className="text-4xl">Sorry !!</p>
          <p className="text-2xl">
            Your order <span className="font-bold">#{orderno}</span> has failed.
          </p>
        </>
      )}
      <div className="flex space-x-5 mt-5">
        <button
          className="button px-6"
          onClick={() => router.push("/your-account/orders")}
        >
          Your Orders
        </button>
        <button className="button px-6" onClick={() => router.push("/")}>
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default ThankYou;
