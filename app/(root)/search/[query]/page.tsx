import { ProductCard } from "@/components";
import { getSearchProducts } from "@/lib/actions/actions";
import React from "react";

const SearchPage = async ({
  params,
}: {
  params: Promise<{ query: string }>;
}) => {
  const { query } = await params;
  const searchedProducts = await getSearchProducts(query);

  const decodedQuery = decodeURIComponent(query);

  return (
    <div className="px-[59px] py-[20px] flex flex-col gap-8">
      <h1 className="font-bold text-[24px] text-gray-500">
        Search results for "{decodedQuery}"
      </h1>

      {!searchedProducts ||
        (searchedProducts.length === 0 && (
          <p className="text-[20px] font-semibold">No results found</p>
        ))}

      <div className="flex flex-wrap gap-16">
        {searchedProducts.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SearchPage;
