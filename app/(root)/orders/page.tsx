import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const OrderPage = async () => {
  const { userId } = await auth();

  const orders = await getOrders(userId as string);
  const totalAmount = orders.reduce(
    (acc: number, order: OrderType) => acc + order.totalAmount,
    0
  );
  const totalProduct = orders.reduce(
    (acc: number, order: OrderType) => acc + order.products.length,
    0
  );

  return (
    <div className="px-[59px] py-[20px] flex flex-col gap-6 ">
      <h1 className="text-[24px] font-bold">Your Orders</h1>
      <div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-6">
        <div className="flex gap-16 max-md:flex-col max-md:gap-4">
          <p>
            <span className="font-bold text-[18px]">Order ID: </span>
            {userId}
          </p>
          <p>
            <span className="font-bold text-[18px]">Total Amount: </span>${" "}
            {totalAmount}
          </p>
          <p>
            <span className="font-bold text-[18px]">Total Product: </span>
            {totalProduct}
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {orders.map((order: OrderType) => (
            <div key={order._id} className="flex flex-col gap-8">
              {order.products.map((orderItem: OrderItemType) => (
                <div key={orderItem._id} className="flex gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt="image"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px] object-contain bg-white shadow-lg rounded-lg"
                  />
                  <div className="flex flex-col gap-4 justify-center">
                    <p className="flex gap-2 text-[18px]">
                      <span className="font-bold">Title: </span>
                      {orderItem.product.title}
                    </p>
                    <p className="flex gap-2 text-[18px]">
                      <span className="font-bold">Color: </span>
                      {orderItem.color}
                    </p>
                    <p className="flex gap-2 text-[18px]">
                      <span className="font-bold">Size: </span>
                      {orderItem.size}
                    </p>
                    <p className="flex gap-2 text-[18px]">
                      <span className="font-bold">Unit Size: </span>
                      {orderItem.product.price}
                    </p>
                    <p className="flex gap-2 text-[18px]">
                      <span className="font-bold">Quantity: </span>
                      {orderItem.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

export const dynamic = "force-dynamic";
