import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }: any) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40 mx-auto">
      {products.slice(0, 4).map((product: any) => (
        <Product product={product} key={product.id} />
      ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {products.slice(4, 5).map((product: any) => (
          <Product product={product} key={product.id} />
        ))}
      </div>

      {products.slice(5, products.length).map((product: any) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductFeed;
