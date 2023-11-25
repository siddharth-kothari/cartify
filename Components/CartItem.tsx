import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const CartItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const removeItemToCart = () => {
    const details = {
      id: item.id,
    };

    dispatch(removeFromCart(details));
  };

  return (
    <div className="grid grid-cols-5">
      <Image
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        objectFit="contain"
      />

      <div className="col-span-3 mx-5 grid space-y-2">
        <p className="text-black">{item.name}</p>
        <p className="text-black">Qty: 1</p>
        <button
          onClick={() => removeItemToCart()}
          className="mt-auto button w-max"
        >
          Remove
        </button>
      </div>

      <div className="mx-5">
        <p className="text-black">₹ {item.price * 80}</p>
      </div>
    </div>
  );
};

export default CartItem;
