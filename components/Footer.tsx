import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPinCheckInside,
  Phone,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#1A1416] text-[#faebd9]">
      <div className="max-w-7xl mx-auto max-lg:flex-wrap max-lg:gap-6 py-[16px] border-b border-gray-300 flex gap-16 justify-between">
        <div className="flex-1 flex flex-col gap-4 p-4">
          <h1 className="text-[24px] font-bold">BinVu's Store</h1>
          <p className="text-[14px]">
            Quality products delivered with care. Your trusted ecommerce
            partner.
          </p>
          <div className="flex gap-4">
            <Facebook className={"w-6 h-6 "} />
            <Linkedin className={"w-6 h-6 "} />
            <Github className={"w-6 h-6 "} />
            <Instagram className={"w-6 h-6 "} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-4 ">
          <h1 className="text-[24px] font-bold">Shop</h1>
          <div className="flex flex-col gap-1">
            <p className="text-[14px]">New Arrivals</p>
            <p className="text-[14px]">Trending</p>
            <p className="text-[14px]">Fashion</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-4 ">
          <h1 className="text-[24px] font-bold">Support</h1>
          <div className="flex flex-col gap-1">
            <p className="text-[14px]">Contact us</p>
            <p className="text-[14px]">Shipping Info</p>
            <p className="text-[14px]">Returns</p>
            <p className="text-[14px]">FAQ</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-4 ">
          <h1 className="text-[24px] font-bold">Get in Touch</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Phone className="h-5 w-5 " />
              <p className="text-[14px]">+84 0332-420-xxx</p>
            </div>
            <div className="flex gap-2">
              <Mail className="h-5 w-5 " />
              <p className="text-[14px]">support@yourstore.com</p>
            </div>
            <div className="flex gap-2">
              <MapPinCheckInside className="h-5 w-5 " />
              <p className="text-[14px]">123 Commerce St, City, ST 12345</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto max-lg:text-center max-lg:flex-col gap-2 py-[16px] flex justify-between">
        <p className="text-gray-500">
          © {new Date().getFullYear()} BinVu's Store. All rights reserved.
        </p>
        <div className="flex gap-4 max-lg:justify-center">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookie Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
