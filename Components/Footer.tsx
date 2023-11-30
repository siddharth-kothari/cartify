import Link from "next/link";
import React from "react";

const Footer = ({ categories }: any) => {
  return (
    <footer className="bg-[#ededed] px-5 py-8 lg:px-10">
      <div className="grid grid-flow-row-dense space-y-5 space-x-3 z-0 grid-cols-2 lg:grid-cols-4 mx-auto">
        <div className="">
          <Link
            href="/"
            className="font-abril text-black text-3xl tracking-wider cursor-pointer"
          >
            Cartify
          </Link>

          <p className="mt-5 text-sm">
            &copy; 2023, Cartify. All Rights Reserved.
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold mb-3">About</p>
          <Link href="#" className="block">
            About Us
          </Link>
          <Link href="#" className="block">
            Our Vision
          </Link>
          <Link href="#" className="block">
            Careers
          </Link>
          <Link href="#" className="block">
            Sell on Cartify
          </Link>
          <Link href="#" className="block">
            About Us
          </Link>
        </div>
        <div>
          <p className="text-lg font-semibold mb-3">Categories</p>
          <div>
            {categories.slice(0, 5).map((category: string, i: number) => (
              <Link
                href={`/category/${category}`}
                key={i}
                className="text-black block capitalize"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold mb-3">Help</p>
          <div>
            <Link href="#" className="block">
              Contact Us
            </Link>
            <Link href="#" className="block">
              Privacy Policy
            </Link>
            <Link href="#" className="block">
              Terms and Conditions
            </Link>
            <Link href="#" className="block">
              Shipping
            </Link>
            <Link href="#" className="block">
              Returns and Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
