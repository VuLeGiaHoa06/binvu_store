"use client";

import { Button } from "@/components/ui/button";
import useCart, { CartStore } from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import {
  CircleMinus,
  CirclePlus,
  Dot,
  Shield,
  Trash,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const cartItems = useCart((state: CartStore) => state.cartItems);
  const increaseQuantity = useCart(
    (state: CartStore) => state.increaseQuantity
  );
  const decreaseQuantity = useCart(
    (state: CartStore) => state.decreaseQuantity
  );
  const removeItem = useCart((state: CartStore) => state.removeItem);

  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const orgPriceRounded = parseFloat(total.toFixed(2));

  const discount = Math.round((orgPriceRounded * 30) / 100);

  const totalRounded = orgPriceRounded - discount;

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
      } else {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cartItems, customer }),
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoading(false);
          window.location.href = data.url;
        }
      }
    } catch (error) {
      console.log("checkout_POST", error);
    }
  };

  return (
    <div className="px-8 py-16">
      <div className="space-y-2 mb-[30px]">
        <h1 className="text-[34px] font-bold">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartItems.length > 1
            ? `${cartItems.length} items `
            : `${cartItems.length} item `}
          in your cart
        </p>
      </div>

      {cartItems.length === 0 || cartItems === null ? (
        <p>No items in cart</p>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg p-6">
              {cartItems.map((cartItem, index) => (
                <div
                  key={cartItem.item._id}
                  className={`${
                    index !== cartItems.length - 1
                      ? "border-b border-gray-300 mb-[20px] pb-[20px]"
                      : ""
                  } flex items-center justify-between`}
                >
                  <Link
                    href={`/products/${cartItem.item._id}`}
                    className="flex gap-4 items-center"
                  >
                    <Image
                      src={cartItem.item.media[0]}
                      alt="image-cart"
                      width={150}
                      height={150}
                      className="flex-none h-[125px] w-[125px] rounded-lg object-cover"
                    />

                    <div className="flex-none flex flex-col">
                      <p className="text-[18px] font-bold">
                        {cartItem.item.title}
                      </p>
                      <p className="flex items-center text-gray-600 text-[14px]">
                        <span>{cartItem.color}</span>
                        <Dot className="h-4 w-4" />
                        <span>Size {cartItem.size}</span>
                      </p>
                      <p className="text-[20px] font-bold mt-[15px]">
                        ${cartItem.item.price}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-col justify-between h-[100px]">
                    <div className="hover:bg-red-100/90 self-end rounded-lg py-3 px-2.5 cursor-pointer group">
                      <Trash
                        size={24}
                        className="text-red-500 "
                        onClick={() => removeItem(cartItem.item._id)}
                      />
                    </div>
                    <div className="flex gap-6 items-center bg-gray-100 rounded-full px-4 py-2">
                      <CircleMinus
                        size={16}
                        className="cursor-pointer hover:text-red-500 rounded-full"
                        onClick={() =>
                          cartItem.quantity > 0 &&
                          decreaseQuantity(cartItem.item._id)
                        }
                      />
                      {cartItem.quantity}
                      <CirclePlus
                        size={16}
                        className="cursor-pointer hover:text-red-500 rounded-full"
                        onClick={() => increaseQuantity(cartItem.item._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-[30px]">
              <div className="bg-blue-100/90 p-4 flex-1 rounded-lg flex gap-2 items-center">
                <Truck className="h-6 w-6" color="blue" />
                <div>
                  <p className="text-[14px] font-bold">Free Shipping</p>
                  <p className="text-[12px] text-gray-500/90">
                    Orders over $100
                  </p>
                </div>
              </div>
              <div className="bg-green-100/90 p-4 flex-1 rounded-lg flex gap-2 items-center">
                <Shield className="h-6 w-6" color="green" />
                <div>
                  <p className="text-[14px] font-bold">Secure Checkout</p>
                  <p className="text-[12px] text-gray-500/90">SSL encrypted</p>
                </div>
              </div>
              <div className="bg-orange-100/90 p-4 flex-1 rounded-lg flex gap-2 items-center">
                <Truck className="h-6 w-6" color="orange" />
                <div>
                  <p className="text-[14px] font-bold">Easy Returns</p>
                  <p className="text-[12px] text-gray-500/90">
                    30-day guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white border border-gray-300 p-4 rounded-lg max-md:w-full">
            <h3 className="font-bold text-[20px]">Order Summary</h3>
            <div className="flex justify-between items-center">
              <p className="text-[16px]">Total Amount</p>
              <p className="text-[16px]">${orgPriceRounded}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[16px]">Discount (30%)</p>
              <p className="text-[16px] text-green-600/90">-${discount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[16px]">Shipping</p>
              <p className="text-[16px] text-green-600/90">
                {orgPriceRounded > 100 ? "FREE" : "$5"}
              </p>
            </div>

            <div className="border border-gray-200 my-[15px]"></div>

            <div className="flex justify-between items-center">
              <p className="text-[18px] font-bold">Total</p>
              <span className="text-[28px] font-bold">${totalRounded}</span>
            </div>
            <div className="w-full space-y-3">
              <Button
                onClick={handleCheckout}
                className="flex w-full gap-2 border border-gray-500 rounded-lg px-4 py-2"
              >
                Proceed to checkout
              </Button>
              <Button
                variant={"outline"}
                className="flex w-full gap-2 border border-gray-500 rounded-lg px-4 py-2"
                onClick={() => router.push("/")}
              >
                Continue to shopping
              </Button>
            </div>

            <div className="border border-gray-200 mt-[10px] mb-[5px]"></div>

            <p className="text-center text-[14px]">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// 1. csr - co nhieu tuong tác(checkout, max/min sl sp)

// 2. need to call api
