"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type HeartFavoriteProps = {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
};

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [isLoading, setisLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setisLoading(true);
      const res = await fetch("/api/users", {
        method: "GET",
      });
      const data = await res.json();
      setisLoading(false);
      setIsLiked(data.wishlist.includes(product._id));
    } catch (error) {
      console.log("getUser_GET", error);
    }
  };

  useEffect(() => {
    setIsLiked(false);
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      if (!user) {
        router.push("sign-in");
        return;
      } else {
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setIsLiked(updatedUser.wishlist.includes(product._id));

        updateSignedInUser && updateSignedInUser(updatedUser);
      }
    } catch (error) {
      console.log("wishlist_POST", error);
    }
  };
  return (
    <button type="button" onClick={handleLike}>
      <Heart fill={isLiked ? "red" : "white"} size={26} />
    </button>
  );
};

export default HeartFavorite;
