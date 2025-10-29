"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
};

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="relative w-[250px] max-lg:w-[300px] flex flex-col gap-4 bg-white  hover:border-gray-200 border rounded-lg hover:shadow-md
       group"
    >
      <div className="absolute top-3 right-3 z-10">
        <HeartFavorite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
      <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
        <Image
          src={product.media[0]}
          alt={product.title}
          height={200}
          width={200}
          className="object-cover h-[200px] w-full rounded-tl-lg rounded-tr-lg group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="space-y-2.5 p-3">
        <p className="uppercase text-[12px] font-semibold">
          {product.category}
        </p>

        <p className="font-bold text-[22px]">{product.title}</p>

        <p className="font-bold text-[24px]">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
