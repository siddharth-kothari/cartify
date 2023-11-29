"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { star } from "./../assets";
import { addToCart, selectItems } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Sugesstions from "./Sugesstions";

const ProductDetail = ({ product }: any) => {
  const items = useSelector(selectItems);

  const quantity = items.find((item: any) => item.id === product.id);

  const qty = quantity ? quantity.qty : 0;

  const [rating] = useState(Math.round(product.rating));
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [reviews, setReviews] = useState(0);
  const [cartCount, setCartCount] = useState(qty);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setReviews(Math.floor(Math.random() * 10001));
  }, []);

  const handleIncreaseQuantity = () => {
    setCartCount(cartCount + 1);
    //dispatch(increaseQTY(id));
  };
  const handleDecreaseQuantity = () => {
    //dispatch(decreaseQTY(id));
    setCartCount(cartCount - 1);
  };
  const addItemToCart = () => {
    if (cartCount > 0) {
      const details = {
        id: product.id,
        category: product.category,
        image: product.thumbnail,
        name: product.title,
        price: product.price,
        qty: cartCount,
      };

      dispatch(addToCart(details));
    }
  };

  const handleDesc = () => {
    setIsDescOpen(true);
    setIsDetailOpen(false);
  };
  const handleDetails = () => {
    setIsDescOpen(false);
    setIsDetailOpen(true);
  };

  return (
    <section className=" px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="text-center">
          <Image
            alt={product.title}
            src={product.thumbnail}
            width={400}
            height={400}
            className="mx-auto object-contain"
          />
        </div>
        <div className="flex flex-col space-y-5">
          <p className="uppercase tracking-wider text-xs">
            {product.rating > 4.5 ? "best seller" : ""}
          </p>
          <p className="text-3xl my-1 capitalize">
            {product.brand === "Apple" ? product.brand : ""} {product.title}
          </p>
          <div className="flex space-x-2 items-center">
            <div className="flex space-x-1">
              {Array(rating)
                .fill(0)
                .map((_, i) => (
                  <Image
                    src={star}
                    alt="star"
                    className="h-3 w-3 text-yellow-500"
                    key={i}
                  />
                ))}
            </div>
            <p className="text-xs">{reviews} reviews</p>
          </div>
          <p>₹ {product.price * 80}</p>
          <div className="flex space-x-3 items-center">
            <div className="flex space-x-2 items-center">
              <button
                className="button w-10 h-10 p-1"
                onClick={handleDecreaseQuantity}
              >
                <MinusIcon />
              </button>
              <p className="text-black">{cartCount}</p>
              <button
                className="button w-10 h-10 p-1 "
                onClick={handleIncreaseQuantity}
              >
                <PlusIcon />
              </button>
              <button
                onClick={() => addItemToCart()}
                // disabled={product.stock > 10}
                className="mt-auto button"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <p className="uppercase tracking-wide text-xs">
            {product.stock > 10 ? "in stock" : "out of stock"}
          </p>
          <div className="flex space-x-2 capitalize text-lg border-b border-black/50">
            <p
              onClick={handleDesc}
              className={`${isDescOpen ? " border-b-4 border-black" : ""}`}
            >
              Description
            </p>
            <p
              onClick={handleDetails}
              className={`${isDetailOpen ? "border-b-4 border-black" : ""}`}
            >
              Details
            </p>
          </div>
          {isDescOpen && (
            <p className=" leading-relaxed">{product.description}</p>
          )}
          {isDetailOpen && (
            <div className="grid grid-cols-3 space-y-2">
              <div>
                <p className="font-bold">Brand</p>
                <p className="font-bold">Product Name</p>
                <p className="font-bold">Warranty</p>
              </div>
              <div>
                <p>{product.brand}</p>
                <p>{product.title}</p>
                <p>1 year</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Sugesstions category={product.category} id={product.id} />
    </section>
  );
};

export default ProductDetail;
