import Banner from "@/Components/Banner";
import ProductFeed from "@/Components/ProductFeed";
import { api } from "./api";

export default async function Home() {
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products`
  );
  const products = data.products;

  return (
    <main className="z-0">
      {/* Banner */}
      <Banner />
      {/* Produts */}
      <ProductFeed products={products} />
    </main>
  );
}
