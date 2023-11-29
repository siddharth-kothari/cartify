"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "@/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const router = useRouter();
  const { status } = useSession();

  const handleCartCheckout = () => {};

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <section>
      {items.length > 0 && (
        <div className="flex flex-col shadow-md p-5 bg-white m-5 md:my-5 md:ml-0 md:mr-5 h-max md:w-[25%]">
          <p className="text-md font-light !mt-1">
            Subtotal ({items.length}
            {items.length === 1 ? " item" : " items"}) : ₹ {total * 80}
          </p>

          <button className="button mt-3" onClick={handleCartCheckout}>
            Proceed to Buy
          </button>
        </div>
      )}
    </section>
  );
};

export default Checkout;
