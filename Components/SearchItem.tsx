import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchItem = ({ result, isResultOpen }: any) => {
  const router = useRouter();
  let ref = useRef<HTMLInputElement>(null);
  ////console.log("isResultOpen", isResultOpen);
  const handleSearchClick = () => {
    router.push(`/product/${result.id}`);
    isResultOpen();
  };
  return (
    <div
      className="flex border-b p-4 gap-2 cursor-pointer"
      onClick={handleSearchClick}
      ref={ref}
    >
      <Image
        alt={result.title}
        src={result.thumbnail}
        width={50}
        height={50}
        className="mx-auto object-contain"
      />
      <div className=" text-xs">
        <p className="font-bold">{result.title}</p>
        <p className="line-clamp-2">{result.description}</p>
      </div>
    </div>
  );
};

export default SearchItem;
