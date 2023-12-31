import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }: any) => {
  return (
    <section className="grid grid-flow-row-dense z-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40 mx-auto lg:px-20 gap-x-8 px-5">
      {products.slice(0, 4).map((product: any) => (
        <Product product={product} key={product.id} />
      ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt="ad-banner"
      />

      <div className="md:col-span-2">
        {products.slice(4, 5).map((product: any) => (
          <Product product={product} key={product.id} />
        ))}
      </div>

      {products.slice(5, products.length).map((product: any) => (
        <Product product={product} key={product.id} />
      ))}
    </section>
  );
};

export default ProductFeed;
