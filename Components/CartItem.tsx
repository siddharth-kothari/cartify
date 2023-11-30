import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQTY, increaseQTY, removeFromCart } from "../slices/cartSlice";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const CartItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const id = item.id;
  const removeItemToCart = () => {
    dispatch(removeFromCart(id));
  };
  const handleIncreaseQuantity = () => {
    dispatch(increaseQTY(id));
  };
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQTY(id));
  };

  return (
    <div className="flex border-b pb-5">
      <div className="w-[30%]">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="mx-5 sm:flex justify-between space-y-5 gap-y-5 place-content-start w-[70%]">
        <div className="space-y-5">
          <Link href={`/product/${item.id}`} className="text-black">
            {item.name}
          </Link>
          <div className="flex space-x-5 items-center">
            <div className="flex space-x-2 items-center">
              <button
                className="button w-8 h-8 p-1"
                onClick={handleDecreaseQuantity}
              >
                <MinusIcon />
              </button>
              <p className="text-black">{item.qty}</p>
              <button
                className="button w-8 h-8 p-1 "
                onClick={handleIncreaseQuantity}
              >
                <PlusIcon />
              </button>
            </div>

            <button
              onClick={() => removeItemToCart()}
              className="mt-auto button w-max h-max"
            >
              Remove
            </button>
          </div>
        </div>
        <p className="text-black">
          ₹ <span>{item.price * 80}</span>
        </p>
      </div>

      <div className="flex justify-center"></div>
    </div>
  );
};

export default CartItem;
