import Collections from "@/components/Collections";
import ProductCard from "@/components/ProductCard";
import { getCollectionsDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) => {
  const { collectionId } = await params;
  const collectionDetails = await getCollectionsDetails(collectionId);

  return (
    <div className="flex flex-col">
      <Image
        src={collectionDetails.image}
        alt="collection_logo"
        width={1500}
        height={1000}
        className="w-full object-cover h-[500px]"
      />
      <div className="px-[59px] py-[40px] flex flex-col gap-16">
        <div className="space-y-2 text-center">
          <p className="text-[48px] font-bold mx-auto">
            {collectionDetails.title}
          </p>
          <p className="text-[18px] text-center">
            {collectionDetails.description}
          </p>
        </div>
        <div className="flex flex-wrap mx-auto gap-8">
          {collectionDetails.products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";

// 1. call api => detail
// mỗi id cần call api 1 lần

// 2. ssr => it tuong tác
// chu yeu de xem du lieu
