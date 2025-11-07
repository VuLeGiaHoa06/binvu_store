import ProductCard from "@/components/ProductCard";
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
    <div className="px-8 py-16">
      <div className="mb-[40px]">
        <h1 className="text-[34px] font-bold">
          Search results for "{decodedQuery}"
        </h1>

        <p className="text-gray-400 mb-[10px]">
          {searchedProducts.length > 1
            ? `${searchedProducts.length} products `
            : `${searchedProducts.length} product `}
          found
        </p>
      </div>

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

// 1. need to call api - moi quert là một request
// 2. ssr - show data - kh co interact
// 3. nhiều productcard - nên call api ở đây - không call ở productcard
