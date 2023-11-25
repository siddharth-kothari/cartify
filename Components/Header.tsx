"use client";

import Link from "next/link";
import React from "react";
import { cart, search } from "./../assets";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems } from "@/slices/cartSlice";
import { RootState } from "@/utils/store";

const Header = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name?.split(" ");
  const username = name ? name[0] : "";
  const items = useSelector((state: RootState) => state.cart.count);

  return (
    <header>
      {/* Top Nav */}
      <div className="bg-[#131921] flex items-center flex-grow px-5 py-2 gap-5">
        <div className="flex items-center flex-grow sm:flex-grow-0">
          <Link
            href="/"
            className="font-abril text-white text-3xl tracking-wider cursor-pointer"
          >
            Cartify
          </Link>
        </div>
        <div className="hidden sm:flex items-center h-10 cursor-pointer bg-yellow-400 hover:bg-yellow-500 flex-grow rounded-md">
          <input
            type="text"
            className="rounded-l-md p-2 px-4 h-full w-6 flex-grow flex-shrink outline-none"
          />
          <Image
            src={search}
            alt="search"
            className="h-12 w-12 p-4 font-bold"
          />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 whitespace-nowrap">
          <Link href="/login" className="link">
            <p>
              Hello,
              {session ? (
                <span className="uppercase"> {username}</span>
              ) : (
                <span> Sign in</span>
              )}
            </p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </Link>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="flex items-center link">
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="h-10 w-10" />
              <span className="bg-yellow-500 text-center rounded-full text-black font-bold absolute -right-1 top-[2px] h-4 w-4">
                {items}
              </span>
            </Link>
            <p className="hidden sm:block mt-2 font-extrabold md:text-sm">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      {/* <div className="bg-[#232f3e] flex items-center space-x-3 p-2 pl-4 text-white text-sm">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link"></p>
        <p className="link"></p>
      </div> */}
    </header>
  );
};

export default Header;
