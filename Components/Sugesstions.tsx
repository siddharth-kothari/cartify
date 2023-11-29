import { api } from "@/app/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Sugesstions = async ({ category, id }: any) => {
  const [suggest, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(
        `${process.env.NEXT_PUBLIC_STORE_BASE_URL}products/category/${category}`
      );

      const suggestions = data.products.filter((item: any) => item.id !== id);

      setSuggestions(suggestions);
    };

    fetchData();
  }, []);
  return (
    <>
      <p className=" capitalize text-3xl font-light mt-20">you may also like</p>
      <div className="flex justify-around mt-10">
        {suggest.map((item: any, i: number) => (
          <div className="flex flex-col justify-between" key={i}>
            <Image
              src={item.thumbnail}
              alt={item.title}
              className="object-contain"
              width={200}
              height={200}
            />
            <div>
              <Link href={`/product/${item.id}`} className=" capitalize">
                {item.title}
              </Link>
              <p>₹ {item.price * 80}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sugesstions;
