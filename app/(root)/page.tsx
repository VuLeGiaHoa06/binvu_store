import Image from "next/image";

import banner from "../../public/banner.png";
import { Collections, Products } from "@/components";

export default function Home() {
  return (
    <div>
      <Image
        src={banner}
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen"
      />

      <div className="flex flex-col gap-8 px-[59px] py-[40px]">
        <Collections />
        <Products />
      </div>
      <div className="h-[300px] w-full"></div>
    </div>
  );
}
