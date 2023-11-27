"use client";

import Image from "next/image";
import React, { useState } from "react";
import { star } from "./../assets";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Product = ({ product }: any) => {
  const [rating] = useState(Math.round(product.rating));
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const details = {
      id: product.id,
      category: product.category,
      image: product.thumbnail,
      name: product.title,
      price: product.price,
      qty: 1,
    };

    dispatch(addToCart(details));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-10 p-10">
      <Image
        src={product.thumbnail}
        width={200}
        height={200}
        className="h-[200px] mx-auto"
        objectFit="contain"
        alt={product.title}
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex space-x-1">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <Image src={star} alt="star" className="h-5 w-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        {/* <Currency quantity={product.price * 80} currency="INR" /> */}
        {/* <CurrencyFormat
          value={product.price * 80}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹ "}
          thousandSpacing={"2s"}
        /> */}
        ₹ {product.price * 80}
      </div>

      <button onClick={() => addItemToCart()} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
