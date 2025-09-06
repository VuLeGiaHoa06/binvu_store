import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="font-bold text-[30px] text-gray-500 px-8 py-4">
        Products
      </h3>
      {!products || products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="flex flex-wrap gap-16 mx-auto">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
