"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

type ProductCardProps = {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
};

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-4 bg-white border border-gray-300 rounded-lg shadow-xl "
    >
      <Image
        src={product.media[0]}
        alt={product.title}
        height={200}
        width={200}
        className="object-cover h-[200px] w-full rounded-tl-lg rounded-tr-lg"
      />
      <div className="flex flex-col px-4 py-2 gap-2">
        <p className="font-bold text-[24px]">{product.title}</p>
        <p className="text-[16px]">{product.category}</p>
        <div className="flex justify-between items-center">
          <p>$ {product.price}</p>
          <HeartFavorite
            product={product}
            updateSignedInUser={updateSignedInUser}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
