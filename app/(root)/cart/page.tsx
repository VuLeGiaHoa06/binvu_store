"use client";

import useCart, { CartStore } from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { CircleMinus, CirclePlus, Trash } from "lucide-react";
import Image from "next/image";
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
  const totalRounded = parseFloat(total.toFixed(2));

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
    <div className="px-[59px] py-[20px] flex flex-col gap-10">
      <h1 className="font-bold text-[24px]">Shopping Cart</h1>
      <div className="h-[1px] bg-gray-200"></div>
      {cartItems && cartItems.length === 0 ? (
        <div className="text-[18px]">No item in cart</div>
      ) : (
        <div className="flex gap-10 w-full max-md:flex-col">
          <div className="w-2/3 max-md:w-full">
            {cartItems && cartItems.length > 0 && (
              <div className="flex flex-col gap-4">
                {cartItems.map((cartItem, index) => (
                  <div
                    key={cartItem.item._id}
                    className="border-b border-gray-200 flex items-center justify-between gap-4 rounded-lg px-[20px]"
                  >
                    <div className="flex gap-6">
                      <Image
                        src={cartItem.item.media[0]}
                        alt="image"
                        width={100}
                        height={100}
                        className="rounded-lg object-contain h-[100px] w-[100px]"
                      />
                      <div className="flex flex-col gap-2 justify-center">
                        <p className="font-bold text-[20px]">
                          {cartItem.item.title}
                        </p>
                        <p>{cartItem.color}</p>
                        <p>{cartItem.size}</p>
                        <p>$ {cartItem.item.price}</p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <CircleMinus
                          size={16}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() =>
                            cartItem.quantity > 0 &&
                            decreaseQuantity(cartItem.item._id)
                          }
                        />
                        {cartItem.quantity}
                        <CirclePlus
                          size={16}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => increaseQuantity(cartItem.item._id)}
                        />
                      </div>
                    </div>
                    <div>
                      <Trash
                        size={16}
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => removeItem(cartItem.item._id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-1/3 flex flex-col gap-6 bg-gray-100 p-4 rounded-lg max-md:w-full">
            <h3 className="font-bold text-[18px]">
              {`Summary (${cartItems.length} ${
                cartItems.length > 0 ? "items" : "item"
              })`}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-[16px] font-bold">Total Amount</p>
              <p className="text-[16px] font-bold flex gap-1">
                <span>$</span>
                {totalRounded}
              </p>
            </div>
            <div className="mx-auto w-full">
              <button
                type="button"
                className=" bg-white rounded-lg hover:bg-black hover:text-white px-4 py-1 w-full font-semibold "
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
