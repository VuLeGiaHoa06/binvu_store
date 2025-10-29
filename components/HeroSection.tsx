import React from "react";
import { Button } from "./ui/button";
import banner from "@/public/banner.png";
import watchBanner from "@/public/watch_banner.png";

import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full py-20 px-8 sm:px-6 lg:px-8 bg-[#F9F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <div className="space-y-4">
              <p className="text-[12px] bg-[#EEE3D7] rounded-full w-fit px-4 py-2 font-semibold uppercase tracking-wider">
                New Collection
              </p>
              <h2 className="text-[48px] lg:text-[60px] font-bold">
                New Fashion Item Released Now!
              </h2>
              <p className="text-[18px] max-w-md">
                Discover our latest collection featuring premium clothing and
                accessories designed for the modern lifestyle.
              </p>
            </div>
            <Button className="w-fit text-primary-foreground px-8 py-6 text-lg rounded-lg transition-all hover:shadow-lg">
              Shop Now
            </Button>
          </div>

          <div className="relative h-96 sm:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-2xl">
                <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-muted flex items-center justify-center">
                  <Image
                    src={banner}
                    alt="Featured Product"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-muted shadow-lg transform translate-y-12">
                <Image
                  src={watchBanner}
                  alt="Product Detail"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
