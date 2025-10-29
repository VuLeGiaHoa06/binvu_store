import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-[59px] py-[80px] bg-[#F9F8F8]">
      <div className="flex flex-col items-center gap-2 ">
        <h3 className="font-bold text-[48px] text-center">
          Explore Our Collections
        </h3>

        <p className="text-[18px] text-gray-400">
          Discover curated collections handpicked for your style
        </p>
      </div>
      {!collections || collections.length === 0 ? (
        <p>No collections found</p>
      ) : (
        <div className="flex gap-10 max-md:flex-col justify-center">
          {collections.map((collection: CollectionType) => (
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              className="max-w-[350px]"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                height={200}
                width={350}
                className="w-[350px] h-[200px] rounded-lg object-cover hover:scale-110 transition-transform duration-500
                "
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;

// 1. collection cần dữ liệu
// => hiển thị dữ liệu

// 2. ssr - it tuong tac
