"use client";

import { Loader, ProductCard } from "@/components";
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
    <div className="px-[59px] py-[20px] flex flex-col gap-6">
      <h1 className="text-[24px] font-bold">Your Wishlist</h1>

      {isLoading ? (
        <Loader />
      ) : wishList.length === 0 ? (
        <p>No items in your wishlist</p>
      ) : (
        <div className="flex flex-wrap mx-auto gap-16">
          {wishList.map((product: ProductType) => (
            <ProductCard
              product={product}
              updateSignedInUser={updateSignedInUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

export const dynamic = "force-dynamic";
