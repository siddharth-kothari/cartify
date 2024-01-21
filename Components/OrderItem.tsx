import { OrderItems } from "@/utils/functions";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { currencyFormatter } from "./CurrencyFormatter";

const OrderItem = async ({ order }: any) => {
  const items: any = await OrderItems(order.id);

  const dateString = order.updated_at;
  const dateObject = new Date(dateString);

  const orderDate = dateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAmount = (amount: any) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="border border-[#D5D9D9] rounded-xl shadow-lg mb-10">
      <div className="p-5 bg-[#f0f2f2] rounded-t-xl rounded-tr-xl rounde flex items-center justify-between">
        <div>
          <p className="uppercase text-xs">Order Placed</p>
          <p className="text-sm">{orderDate}</p>
        </div>

        <div>
          <p className="uppercase text-xs">total</p>
          <p className="text-sm">{formattedAmount(order.amount)}</p>
        </div>

        <div>
          <p className="uppercase text-xs">ship to</p>
          <p className="text-sm">{order.name}</p>
        </div>

        <div>
          <p className="uppercase text-xs">order no.</p>
          <p className="text-sm">#{order.orderno}</p>
        </div>

        <div>
          <p className="uppercase text-xs">status</p>
          <p className="text-sm">{order.status}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {items.map((item: any) => (
          <div className="flex p-5" key={item.item_id}>
            <div className="">
              <Image
                src={item.image}
                alt={item.item_name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            <div className="mx-5 space-y-5">
              <div className="space-y-5">
                <Link href={`/product/${item.item_id}`} className="text-black">
                  {item.item_name}
                </Link>
              </div>
              <p className="text-black">
                <span>{formattedAmount(item.amount * item.qty)}</span>
              </p>
            </div>

            <div className="flex justify-center"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
