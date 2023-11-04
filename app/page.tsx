import Banner from "@/Components/Banner";
import ProductFeed from "@/Components/ProductFeed";
import { api } from "./api";

export default async function Home() {
  const { data } = await api.get("/products");
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
