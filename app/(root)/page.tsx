import Collections from "@/components/Collections";
import Products from "@/components/Products";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import BrandTrip from "@/components/BrandTrip";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandTrip />
      <Collections />
      <Products />
      <NewsLetter />
    </>
  );
}

// 1. ở đây không cần dữ liệu

// 2. 2-comp-con không cần chung dữ liệu

// 3. ssr - không có tương tác - cần re-render
