"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { clothing, gadgets, furniture, groceries } from "@/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={5000}
      >
        <Image
          src={clothing}
          alt="clothing"
          loading="lazy"
          quality={50}
          className="h-[600px] object-fill object-center"
        />
        <Image
          src={gadgets}
          alt="gadgets"
          loading="lazy"
          quality={50}
          objectFit="contain"
          className="h-[600px] object-fill object-center"
        />
        <Image
          src={furniture}
          alt="furniture"
          loading="lazy"
          quality={50}
          objectFit="contain"
          className="h-[600px] object-fill object-center"
        />
        <Image
          src={groceries}
          alt="groceries"
          loading="lazy"
          quality={50}
          objectFit="contain"
          className="h-[600px] object-fill object-center"
        />
      </Carousel>
    </div>
  );
};

export default Banner;
