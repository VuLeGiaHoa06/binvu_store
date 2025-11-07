import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Check, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrderPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const orders = await getOrders(userId);

  const totalAmount = Number.parseFloat(
    orders.reduce((acc: number, order: OrderType) => acc + order.totalAmount, 0)
  ).toFixed(2);

  const totalProduct = orders.reduce(
    (acc: number, order: OrderType) => acc + order.products.length,
    0
  );


  return (
    <div className="px-8 py-16">
      <div className="space-y-2 mb-[20px]">
        <h1 className="text-[34px] font-bold">Your Orders</h1>
        <p className="text-[18px] text-gray-500">
          Track and manage your purchases
        </p>
      </div>

      <div className="w-full border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg">
        <div className="bg-gray-100 px-4 py-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ">
              <Check className="h-10 w-10 text-green-600 p-3 rounded-full bg-green-200" />
              <div>
                <p className="text-[12px] text-gray-500 font-semibold">
                  Order ID
                </p>
                <p className="text-[14px]">{userId}</p>
              </div>
            </div>
            <div>
              <p className="text-[12px] text-gray-500 font-semibold text-right">
                Status
              </p>
              <p className="text-[14px] font-semibold">Delivered</p>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="bg-white flex-1 px-4 py-3 rounded-lg">
              <p className="text-[12px] text-gray-500 font-semibold">
                Total Amount
              </p>
              <p className="text-[18px] font-bold">${totalAmount}</p>
            </div>
            <div className="bg-white flex-1 px-4 py-3 rounded-lg">
              <p className="text-[12px] text-gray-500 font-semibold">Items</p>
              <p className="text-[18px] font-bold">{totalProduct}</p>
            </div>
            <div className="bg-white flex-1 px-4 py-3 rounded-lg">
              <p className="text-[12px] text-gray-500 font-semibold">
                Order Date
              </p>
              <p className="text-[18px] font-bold">27/8/2025</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 flex flex-col">
          {orders.length === 0 || orders === null
            ? "Dont hanve any order yet"
            : orders.map((order: OrderType, index: number) => (
                <div
                  key={order._id}
                  className={`${
                    index !== orders.length - 1
                      ? "border-b border-gray-300 mb-[20px] pb-[20px]"
                      : ""
                  } `}
                >
                  {order.products.map((order: OrderItemType) => (
                    <Link
                      href={`/products/${order.product._id}`}
                      key={order._id}
                      className="flex items-center gap-4"
                    >
                      <Image
                        src={order.product?.media[0]}
                        alt="product-detail"
                        width={200}
                        height={200}
                        className="flex-none h-[150px] w-[150px] rounded-lg object-cover"
                      />
                      <div className="flex-1 grid grid-cols-3 gap-y-3 items-center justify-between ">
                        <h1 className="text-[20px] font-bold col-span-3">
                          {order.product?.title}
                        </h1>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[12px] text-gray-500 font-semibold">
                              Color
                            </p>
                            <p className="text-[14px] font-semibold">
                              {order.color}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-gray-500 font-semibold">
                              Price
                            </p>
                            <p className="text-[14px] font-semibold">
                              ${order.product?.price}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[12px] text-gray-500 font-semibold">
                              Size
                            </p>
                            <p className="text-[14px] font-semibold">
                              {order.size}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-gray-500 font-semibold">
                              Quantity
                            </p>
                            <p className="text-[14px] font-semibold">
                              {order.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 justify-self-end">
                          <button
                            type="button"
                            className="w-[138px] px-4 py-2 border border-gray-300 rounded-lg flex gap-2 items-center justify-center hover:bg-gray-100"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Reorder
                          </button>
                          <button
                            type="button"
                            className="w-[138px] px-4 py-2 rounded-lg flex gap-2 items-center justify-center hover:bg-gray-100"
                          >
                            View Details
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
        </div>
        <div className="px-8 py-4 bg-gray-100">
          <div className="flex justify-between items-center">
            <p>
              <span className="text-gray-500">Need help?</span>Contact Support
            </p>

            <Button className="flex items-center gap-2">
              Track Order
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

export const dynamic = "force-dynamic";

// 1. ssr -> xem dữ liệu đã order, kh can tuong tac

// 2. need to call api
