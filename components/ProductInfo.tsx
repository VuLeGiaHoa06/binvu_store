"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import HeartFavorite from "./HeartFavorite";
import { useState } from "react";
import useCart, { CartStore } from "@/lib/hooks/useCart";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface addToCartProps {
  product: ProductType;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const ProductInfo = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const discountLabel = Math.round(
    ((product.orgPrice - product.price) / product.orgPrice) * 100
  );

  const router = useRouter();
  const { user } = useUser();

  const addItem = useCart((state: CartStore) => state.addItem);

  const handleAddToCart = ({
    product,
    quantity,
    selectedColor,
    selectedSize,
  }: addToCartProps) => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    addItem({
      item: product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-[400px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold text-[30px]">{product.title}</p>
        <span className="self-start">
          <HeartFavorite product={product} />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-[16px] font-semibold">
          Caterogy:
        </span>
        <p className="font-medium ">{product.category}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-[24px] font-bold">${product.price}</p>
        <p className="text-[24px] font-bold text-gray-400 line-through">
          ${product.orgPrice}
        </p>
        <p className="self-center px-2 max-h-[25px] flex items-center bg-red-100 text-red-500 rounded-full">
          -{discountLabel}%
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-[16px] font-semibold">
          Description:{" "}
        </span>
        <p className="text-[16px] font-semibold">{product.description}</p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-[16px] font-semibold">
          Colors:{" "}
        </span>
        {product.colors.length > 0 && (
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={`px-2  border-2 border-black rounded-lg hover:bg-[#1E3A8A] hover:text-white cursor-pointer ${
                  color === selectedColor ? "bg-[#1E3A8A] text-white" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-[16px] font-semibold">Sizes: </span>
        {product.sizes.length > 0 && (
          <div className="flex gap-2">
            {product.sizes.map((size, index) => (
              <div
                key={index}
                className={`px-2  border-2 border-black rounded-lg hover:bg-[#1E3A8A] hover:text-white cursor-pointer ${
                  size === selectedSize ? "bg-[#1E3A8A] text-white" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-[16px] font-semibold">
          Quantity:{" "}
        </span>
        <div className="flex gap-4 items-center">
          <CircleMinus
            size={16}
            className="cursor-pointer hover:text-red-500"
            onClick={() => {
              quantity > 1 && setQuantity((prev) => prev - 1);
            }}
          />
          {quantity}
          <CirclePlus
            size={16}
            className="cursor-pointer hover:text-red-500"
            onClick={() => setQuantity((prev) => prev + 1)}
          />
        </div>
      </div>
      <Button
        variant={"outline"}
        type="button"
        onClick={() =>
          handleAddToCart({ product, quantity, selectedColor, selectedSize })
        }
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInfo;
