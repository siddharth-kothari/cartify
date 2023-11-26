import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQTY, increaseQTY, removeFromCart } from "../slices/cartSlice";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

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
    <div className="grid grid-cols-5 border-b pb-5">
      <Image
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        objectFit="contain"
      />

      <div className="col-span-3 mx-5 grid gap-y-5 place-content-start">
        <p className="text-black">{item.name}</p>
        <div className="flex space-x-2">
          <button
            className="button w-6 h-6 p-1"
            onClick={handleDecreaseQuantity}
          >
            <MinusIcon />
          </button>
          <p className="text-black">{item.qty}</p>
          <button
            className="button w-6 h-6 p-1"
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

      <div className="flex justify-center">
        <p className="text-black">
          ₹ <span>{item.price * 80}</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
