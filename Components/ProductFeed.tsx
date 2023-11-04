import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }: any) => {
  return (
    <div>
      {products.map((product: any) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductFeed;
