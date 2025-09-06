import { Gallery, ProductCard, ProductInfo } from "@/components";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  return (
    <div className="flex flex-col gap-10 px-[59px] py-[30px]">
      <div className="flex gap-16 items-center justify-center px-10 py-10 max-md:flex-col max-md:gap-10">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo product={productDetails} />
      </div>

      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="font-bold text-[24px] text-gray-500">
          Related Products
        </h1>
        <div className="flex justify-center gap-10">
          {relatedProducts.map((product: ProductType) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const dynamic = "force-dynamic";
