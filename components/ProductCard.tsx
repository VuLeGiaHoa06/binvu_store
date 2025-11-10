"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
  page?: string;
};

const ProductCard = ({
  product,
  updateSignedInUser,
  page,
}: ProductCardProps) => {
  const discountLabel = Math.round(
    ((product?.orgPrice - product?.price) / product?.orgPrice) * 100
  );

  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="relative w-[300px] max-lg:w-[320px] flex flex-col gap-4 bg-white  hover:border-gray-200 border rounded-lg hover:shadow-md
       group"
    >
      <p className="absolute top-3 left-3 z-10 px-2  rounded-full bg-[#EA0009] text-white">
        -{discountLabel}% OFF
      </p>
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
        <p className="uppercase text-[12px] font-semibold text-gray-500">
          {product.category}
        </p>

        <p className="font-bold text-[22px]">
          {product.title.length > 20
            ? `${product.title.slice(0, 20)}...`
            : product.title}
        </p>

        <div className="flex gap-2 items-baseline">
          <p className="font-bold text-[28px]">${product?.price}</p>
          <p className="font-bold text-[18px] text-gray-500 line-through">
            ${typeof product.orgPrice === "number" && product?.orgPrice}
          </p>
        </div>

        {page === "wishlist" && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-[#1E3A8A] text-white rounded-lg w-full py-2 hover:bg-[#1E3A8A]/90"
          >
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
