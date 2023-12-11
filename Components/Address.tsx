"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SingleAddress from "./SingleAddress";
import { useSession } from "next-auth/react";
import Loading from "./Loading";

const Address = ({ addresses }: any) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <section className="lg:px-20 gap-x-8 px-5 max-w-screen-xl mx-auto py-10">
      <div className="flex justify-between items-center">
        <p className="text-3xl mb-5">Your Addresses</p>
        <button
          className="button"
          onClick={() => router.push("/your-account/addresses/add-address")}
        >
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
        {addresses.map((address: any) => (
          <SingleAddress address={address} />
        ))}
      </div>
    </section>
  );
};

export default Address;
