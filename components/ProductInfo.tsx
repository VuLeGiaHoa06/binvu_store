"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import HeartFavorite from "./HeartFavorite";
import { useState } from "react";
import useCart, { CartStore } from "@/lib/hooks/useCart";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const addItem = useCart((state: CartStore) => state.addItem);

  return (
    <div className="flex flex-col gap-2 w-[400px]">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold text-[30px]">{product.title}</p>
        <HeartFavorite product={product} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-[16px] font-semibold">
          Caterogy:
        </span>
        <p className="font-medium ">{product.category}</p>
      </div>
      <div className="text-[24px] font-bold">$ {product.price}</div>
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
                className={`px-2  border-2 border-black rounded-lg hover:bg-black hover:text-white cursor-pointer ${
                  color === selectedColor ? "bg-black text-white" : ""
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
        <span className="text-gray-500 text-16px]">Sizes: </span>
        {product.sizes.length > 0 && (
          <div className="flex gap-2">
            {product.sizes.map((size, index) => (
              <div
                key={index}
                className={`px-2  border-2 border-black rounded-lg hover:bg-black hover:text-white cursor-pointer ${
                  size === selectedSize ? "bg-black text-white" : ""
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
      <button
        type="button"
        className="w-full border-2 border-black hover:bg-black hover:text-white rounded-lg px-4 py-1"
        onClick={() =>
          addItem({
            item: product,
            quantity,
            color: selectedColor,
            size: selectedSize,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
