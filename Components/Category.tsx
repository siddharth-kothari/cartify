"use client";

import React from "react";
import Product from "./Product";

const Category = ({ products, category }: any) => {
  return (
    <section className="lg:px-20 px-5 py-20">
      <p className="text-3xl text-center font-abril capitalize">{category}</p>

      <div className="grid grid-flow-row-dense z-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto lg:px-20 gap-x-8">
        {products.map((product: any) => {
          <Product product={product} key={product.id} />;
        })}
      </div>
    </section>
  );
};

export default Category;
