import ProductDetail from "@/Components/ProductDetail";
import { api } from "@/app/api";

export async function generateMetadata({ params }: any) {
  const { slug } = params;
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/${slug}`
  );

  return {
    title: data.title + " | " + data.brand + " | " + data.category,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
      images: [data.thumbnail],
    },
  };
}

export default async function ProductPage({ params }: any) {
  const { slug } = params;
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/${slug}`
  );

  return <ProductDetail product={data} />;
}
