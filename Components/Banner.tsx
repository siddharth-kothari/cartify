"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
        <div>
          <img src="https://links.papareact.com/gi1" loading="lazy" alt="" />
        </div>

        <div>
          <img src="https://links.papareact.com/6ff" loading="lazy" alt="" />
        </div>

        <div>
          <img src="https://links.papareact.com/7ma" loading="lazy" alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
