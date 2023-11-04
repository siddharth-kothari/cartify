"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useState } from "react";
import Currency from "react-currency-formatter";

const Product = ({ product }: any) => {
  const [rating] = useState(Math.round(product.rating));
  return (
    <div>
      <p>{product.category}</p>
      <Image
        src={product.thumbnail}
        width={200}
        height={200}
        objectFit="contain"
        alt={product.title}
      />
      <h4>{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon className="h-5" />
          ))}
      </div>
      <p>{product.description}</p>
      <div>
        <Currency />
      </div>
    </div>
  );
};

export default Product;
