//import ProductDetail from "@/Components/ProductDetail";
import Product from "@/Components/Product";
import { api } from "@/app/api";

export default async function CategoryPage({ params }: any) {
  const { slug } = params;
  const { data } = await api.get(
    `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/category/${slug}`
  );

  const products = data.products;

  return (
    <section className="lg:px-20 px-5 py-10">
      <p className="text-3xl text-center font-abril capitalize mb-5">{slug}</p>
      <div className="grid grid-flow-row-dense z-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto lg:px-20 gap-x-8">
        {products.map((product: any) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
