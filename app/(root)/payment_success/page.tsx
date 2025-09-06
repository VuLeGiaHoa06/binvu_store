"use client";

import useCart, { CartStore } from "@/lib/hooks/useCart";
import Link from "next/link";
import React, { useEffect } from "react";

const SuccessfulPayment = () => {
  const clearItems = useCart((state: CartStore) => state.clearItems);

  useEffect(() => {
    clearItems();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="font-bold text-[24px]">Successful</h1>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="px-4 py-2 border-2 border-black hover:bg-black hover:text-white rounded-lg"
      >
        Continue to shopping
      </Link>
    </div>
  );
};

export default SuccessfulPayment;

export const dynamic = "force-dynamic";
