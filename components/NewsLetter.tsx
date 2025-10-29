import { Mail } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const NewsLetter = () => {
  return (
    <div className="py-[60px] bg-[#082047] ">
      <div className="max-w-5xl space-y-10 mx-auto">
        <Mail className="h-20 w-20 text-white p-5 rounded-full bg-[#20375A] mx-auto"></Mail>

        <div className="flex flex-col items-center gap-4 text-white text-center">
          <h1 className="text-[34px] font-bold">
            Join Our Community & Get 10% Off
          </h1>
          <p className="text-[20px] max-w-[700px]">
            Subscribe to our newsletter and receive exclusive offers, design
            inspiration, and early access to new products. Plus, enjoy 10% off
            your first order!
          </p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <input
            type="text"
            className="px-6 py-2 rounded-lg w-[300px] outline-none"
            placeholder="Enter your email"
          />
          <Button className="py-3 ">Subcribe</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
