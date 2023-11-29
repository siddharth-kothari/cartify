"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { star } from "./../assets";
import {
  addToCart,
  decreaseQTY,
  increaseQTY,
  selectItems,
} from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { api } from "@/app/api";
import Link from "next/link";

const ProductDetail = async ({ product }: any) => {
  const [rating] = useState(Math.round(product.rating));
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [reviews, setReviews] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const dispatch = useDispatch();

  // const items = useSelector(selectItems);
  //const qty = items.find((item: any) => item.id === product.id);
  //console.log(qty);

  useEffect(() => {
    setReviews(Math.floor(Math.random() * 10001));
  }, []);

  const id = product.id;

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

  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/category/${product.category}`
  );

  const suggestions = data.products.filter(
    (item: any) => item.id !== product.id
  );
  return (
    <section className=" px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="tex-center">
          <Image
            src={product.thumbnail}
            alt={product.name}
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

      <p className=" capitalize text-3xl font-light mt-20">you may also like</p>
      <div className="flex justify-around mt-10">
        {suggestions.map((item: any, i: number) => (
          <div className="flex flex-col justify-between" key={i}>
            <Image
              src={item.thumbnail}
              alt={item.title}
              className="object-contain"
              width={200}
              height={200}
            />
            <div>
              <Link href={`/product/${item.id}`} className=" capitalize">
                {item.title}
              </Link>
              <p>₹ {item.price * 80}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetail;
