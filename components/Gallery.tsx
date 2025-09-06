"use client";

import Image from "next/image";
import { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className=" flex flex-col gap-2 items-center w-[400px]">
      <Image
        src={mainImage}
        alt="image"
        height={500}
        width={500}
        className="h-[500px] w-[500px] object-cover rounded-lg"
      />
      <div className="flex gap-2 overflow-x-auto tailwind-scrollbar-hide">
        {productMedia.map((image: string) => (
          <Image
            key={image}
            src={image}
            alt="image"
            width={100}
            height={100}
            className={`object-cover h-[100px] w-[100px] rounded-lg cursor-pointer ${
              mainImage === image ? "border-4 border-black" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
