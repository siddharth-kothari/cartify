"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "@/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/app/api";
import { load } from "@cashfreepayments/cashfree-js";
import Loading from "@/app/loading";
import { toast } from "react-toastify";

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  const { data: session } = useSession();

  const handleCartCheckout = async () => {
    setIsLoading(true);
    const data = JSON.stringify({
      total,
      items,
    });

    const headers = {
      "Content-Type": "application/json", // Adjust the content type based on your API's requirements
      Authorization: "Bearer " + session?.user.accesToken,
    };

    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout`,
      data,
      { headers }
    );

    console.log("sessID", res.data);

    if (res.data.status === 201) {
      setIsLoading(false);
      const cashfree = await load({
        mode: "sandbox",
      });

      let checkoutOptions = {
        paymentSessionId: res.data.data,
        redirectTarget: "_self", //optional (_self or _blank)
      };

      cashfree.checkout(checkoutOptions);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong!!", {
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
  };

  if (isLoading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   if (status !== "authenticated") {
  //     router.replace("/");
  //   }
  // }, [status, router]);

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
