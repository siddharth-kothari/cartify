"use client";

import Link from "next/link";
import React, { useState } from "react";
import { cart, search } from "./../assets";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems } from "@/slices/cartSlice";
import { RootState } from "@/utils/store";
import { useRouter } from "next/navigation";

const Header = ({ categories }: any) => {
  const { data: session, status } = useSession();
  const name = session?.user?.name?.split(" ");
  const username = name ? name[0] : "";
  const items = useSelector((state: RootState) => state.cart.count);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSignIn = () => {
    if (!session?.user) {
      router.replace("/login");
    }
  };

  return (
    <header className="sticky top-0 z-20">
      {/* Top Nav */}
      <div className="bg-[#f7f7f7] flex items-center flex-grow px-5 lg:px-20 py-2 gap-5 justify-between">
        <div className="flex items-center flex-grow sm:flex-grow-0">
          <Link
            href="/"
            className="font-abril text-black text-3xl tracking-wider cursor-pointer"
          >
            Cartify
          </Link>
        </div>

        <div className="flex space-x-5">
          <div className="hidden border-b border-black sm:flex items-center  cursor-pointer  flex-grow">
            <input
              type="text"
              className="h-full flex-grow bg-[#f7f7f7] outline-none b"
              placeholder="Search..."
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-black" />
          </div>
          <div
            className="link relative grid justify-end items-end p-0 cursor-pointer"
            onMouseEnter={toggleProfileDropdown}
            onMouseLeave={toggleProfileDropdown}
            onClick={handleSignIn}
          >
            <p>
              <UserIcon className="w-6 h-6 text-black" />
            </p>

            {session?.user && isProfileDropdownOpen && (
              <div className="absolute z-10 -right-10 top-[12px] px-4 mt-2 py-2 w-32 bg-white rounded-md shadow-lg transform translate-y-1 transition-all ease-in-out duration-300">
                <p className="text-black font-semibold font-manrope text-sm py-2 cursor-default">
                  Hi, <span>{username}</span>
                </p>
                <Link
                  href="/your-account"
                  className="cursor-pointer block py-[2px] text-sm text-black"
                >
                  Your Account
                </Link>
                <Link
                  href={`/your-account/orders`}
                  className="cursor-pointer block py-[2px] text-sm text-black"
                >
                  Your Orders
                </Link>
                <Link
                  href={`/your-account/addresses`}
                  className="cursor-pointer block py-[2px] text-sm text-black"
                >
                  Addresses
                </Link>
                <p
                  onClick={() => signOut()}
                  className="cursor-pointer block py-[2px] text-sm text-black"
                >
                  Sign Out
                </p>
              </div>
            )}
          </div>

          <div className="grid justify-end items-end">
            <Link href="/cart" className="relative text-center">
              <span className="text-center text-black text-sm md:text-xs absolute -top-3 left-[10px]">
                {items}
              </span>
              <ShoppingCartIcon className="h-6 w-6 text-black" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bg-[#f7f7f7] hidden text-black lg:flex items-center justify-between p-4 lg:px-20 pb-6 text-sm">
        {categories.map((category: string, i: number) => (
          <Link href="" key={i} className="text-black capitalize">
            {category}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
