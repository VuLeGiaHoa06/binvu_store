"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishList, setWishList] = useState<ProductType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setSignedInUser(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("user_GET", error);
    }
  };

  const getWishListProducts = async () => {
    try {
      setIsLoading(true);

      if (!signedInUser) return;

      const wishListProduct = await Promise.all(
        signedInUser.wishlist.map(async (productId: string) => {
          const res = await getProductDetails(productId);

          return res;
        })
      );

      setWishList(wishListProduct);
      setIsLoading(false);
    } catch (error) {
      console.log("product_GET", error);
    }
  };

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    if (signedInUser) {
      getWishListProducts();
    }
  }, [signedInUser]);

  return (
    <div className="px-8 py-16">
      <div className="space-y-2 mb-[20px]">
        <h1 className="text-[34px] font-bold">Your Wishlist</h1>
        <p className="text-[18px] text-gray-500">
          {wishList.length > 1
            ? `${wishList.length} items `
            : `${wishList.length} item `}
          saved
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : wishList.length === 0 ? (
        <p>No item in your wishlist</p>
      ) : (
        <div
          className="grid grid-cols-4
         grid-flow-dense gap-6 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center"
        >
          {wishList.map((product: ProductType) => (
            <ProductCard
              product={product}
              updateSignedInUser={updateSignedInUser}
              page="wishlist"
            />
          ))}
        </div>
      )}

      <div className="p-12 rounded-lg bg-[#1E3A8A] text-center mt-[20px]">
        <h3 className="text-[30px] font-bold mb-3 text-white">
          Still looking for something?
        </h3>
        <p className="text-[18px] mb-6 opacity-90 text-white">
          Explore thousands of products with exclusive deals available only this
          weekend
        </p>

        <button
          type="button"
          className="rounded-lg bg-white hover:bg-white/90 px-3 py-2"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Wishlist;

export const dynamic = "force-dynamic";

// 1. csr - có interact by user => like
// 2. call api
