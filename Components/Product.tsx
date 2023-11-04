"use client";

import Image from "next/image";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { star } from "./../assets";

const Product = ({ product }: any) => {
  const [rating] = useState(Math.round(product.rating));
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
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
        <CurrencyFormat
          value={product.price * 80}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹ "}
          thousandSpacing={"2s"}
        />
      </div>

      <button className="mt-auto button">Add to Cart</button>
    </div>
  );
};

export default Product;
