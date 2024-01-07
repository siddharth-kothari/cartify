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
import { PlusIcon } from "@heroicons/react/24/outline";

const Checkout = ({ addresses }: any) => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  // const router = useRouter();
  const { data: session } = useSession();

  const handleCartCheckout = async () => {
    setIsLoading(true);
    const data = JSON.stringify({
      total,
      items,
      addressid: selectedAddress,
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
  const router = useRouter();
  // useEffect(() => {
  //   if (status !== "authenticated") {
  //     router.replace("/");
  //   }
  // }, [status, router]);

  return (
    <section className="lg:px-20 gap-x-8 px-5 md:px-20 mx-auto py-10 flex items-center justify-center md:flex max-w-screen-2xl">
      <div className="m-5 shadow-sm md:w-[75%] bg-white p-5">
        <div className="flex-col space-y-10 bg-white w-full">
          <h1 className="text-2xl border-b pb-3">Select a delivery address</h1>
        </div>

        {addresses.map((address: any) => (
          <div className="flex gap-2 border p-5 mt-5">
            <input
              type="radio"
              key={address.id}
              name=""
              id={`address-${address.id}`}
              value={address.id}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
            <label
              htmlFor={`address-${address.id}`}
              className=" cursor-pointer"
            >
              <span className="font-bold">{address.name} </span>
              {address.address}
            </label>
          </div>
        ))}

        <button
          className="button mt-5 flex items-center gap-2"
          onClick={() => router.push("/your-account/addresses/add-address")}
        >
          <PlusIcon className="w-5 h-5" />
          Add New Address
        </button>
      </div>

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
