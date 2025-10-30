import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-[#F5F4F4] px-[59px] py-[80px]">
      <div className="flex flex-col items-center gap-2 ">
        <h3 className="font-bold text-[48px]">Featured Products</h3>

        <p className="text-[18px] text-gray-400">
          Handpicked items from our latest collection
        </p>
      </div>
      {!products || products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-4 grid-flow-dense gap-6 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <Button variant={"outline"}>View All Products</Button>
    </div>
  );
};

export default Products;

// 1. productCard - có nhiều
// => fetch ở comp cha

// 2. ở đây cần dữ liệu - để CHECK khi kh co sản phẫm

// 3. ssr - không có tương tác
