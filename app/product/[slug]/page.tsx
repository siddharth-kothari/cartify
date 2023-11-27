import ProductDetail from "@/Components/ProductDetail";
import { api } from "@/app/api";

export default async function ProductPage({ params }: any) {
  const { slug } = params;
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/${slug}`
  );

  return <ProductDetail product={data} />;
}
