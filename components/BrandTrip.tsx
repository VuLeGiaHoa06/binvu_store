import Image from "next/image";
import React from "react";
import imageNike from "@/public/brands/nike.png";
import imageAdidas from "@/public/brands/adidas.png";
import imageSalt from "@/public/brands/salt&surf.png";
import imageRolex from "@/public/brands/rolex.png";

const BrandTrip = () => {
  return (
    <div className="w-full bg-black h-[100px] flex items-center justify-center">
      <Image
        src={imageNike}
        alt="nike"
        width={130}
        height={100}
        className="object-contain max-w-[200px]"
      />
      <Image
        src={imageAdidas}
        alt="nike"
        width={200}
        height={200}
        className="object-contain max-w-[200px]"
      />
      <Image
        src={imageSalt}
        alt="nike"
        width={200}
        height={200}
        className="object-contain max-w-[200px]"
      />
      <Image
        src={imageRolex}
        alt="nike"
        width={200}
        height={200}
        className="object-contain max-w-[200px]"
      />
    </div>
  );
};

export default BrandTrip;
