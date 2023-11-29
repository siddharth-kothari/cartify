"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { clothing, gadgets, furniture, groceries } from "@/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative">
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
          className="md:h-[600px] md:object-fill object-contain object-center"
        />
        <Image
          src={gadgets}
          alt="gadgets"
          loading="lazy"
          quality={50}
          objectFit="contain"
          className="md:h-[600px] md:object-fill object-contain object-center"
        />
        <Image
          src={furniture}
          alt="furniture"
          loading="lazy"
          quality={50}
          objectFit="contain"
          className="md:h-[600px] md:object-fill object-contain object-center"
        />
        <Image
          src={groceries}
          alt="groceries"
          loading="lazy"
          quality={50}
          objectFit="contain"
          className="md:h-[600px] md:object-fill object-contain object-center"
        />
      </Carousel>
    </section>
  );
};

export default Banner;
