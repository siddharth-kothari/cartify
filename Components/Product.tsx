"use client";

import Image from "next/image";
import React, { useState } from "react";
import { star } from "./../assets";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Link from "next/link";
import { currencyFormatter } from "./CurrencyFormatter";

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
      desc: product.description,
      qty: 1,
    };

    dispatch(addToCart(details));
  };

  return (
    <div
      className="relative flex flex-col my-5 bg-white z-10 p-8 shadow-lg"
      key={product.id}
    >
      <Image
        src={product.thumbnail}
        width={200}
        height={200}
        className="h-[200px] mx-auto object-contain"
        alt={product.title}
      />
      <Link
        href={`/product/[product.id]`}
        as={`/product/${product.id}`}
        className="my-3"
      >
        {product.title}
      </Link>
      <div className="flex space-x-1">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <Image
              src={star}
              alt="star"
              className="h-5 w-5 text-yellow-500"
              key={i}
            />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">{currencyFormatter(product.price * 80)}</div>

      <button onClick={() => addItemToCart()} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
