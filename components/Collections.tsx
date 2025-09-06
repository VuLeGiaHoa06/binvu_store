import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="font-bold text-[30px] text-gray-500 px-8 py-4">
        Collections
      </h3>
      {!collections || collections.length === 0 ? (
        <p>No collections found</p>
      ) : (
        <div className="flex gap-4">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <Image
                src={collection.image}
                alt={collection.title}
                height={200}
                width={350}
                className="rounded-lg object-cover h-[200px]"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
