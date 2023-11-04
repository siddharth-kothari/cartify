import Banner from "@/Components/Banner";
import ProductFeed from "@/Components/ProductFeed";
import { api } from "./api";
import axios from "axios";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res;
};

export default async function Home() {
  const { data } = await getAllProducts();

  const products = data.products;

  return (
    <main className="bg-[#f5f5f5]">
      {/* Banner */}
      <Banner />
      {/* Produts */}
      <ProductFeed products={products} />
    </main>
  );
}
