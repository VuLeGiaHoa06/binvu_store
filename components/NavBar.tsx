"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

import logo from "../public/logo.png";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { navLink } from "@/lib/contant";
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const { cartItems } = useCart();

  return (
    <div className="flex justify-between px-8 py-4 sticky top-0 w-full z-10 bg-white shadow-xl items-center">
      <Link href="/">
        <Image src={logo} alt="logo" width={130} height={100} />
      </Link>

      <div className="flex gap-6 items-center max-md:hidden max-lg:gap-1">
        {navLink.map((item) => (
          <Link
            className={`flex gap-2 px-4 py-2 hover:bg-black hover:text-white rounded-lg ${
              pathname === item.url ? "bg-black text-white" : ""
            }`}
            href={item.url}
            key={item.label}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      <div className="max-md:w-[200px] max-lg:mr-[10px] w-[300px] flex justify-between items-center relative">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none rounded-2xl bg-gray-200 w-full py-2 px-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          disabled={query === ""}
          className="absolute right-4 cursor-pointer"
          onClick={() => {
            router.push(`/search/${query}`);
          }}
        >
          <Search />
        </button>
      </div>

      <div className="flex gap-4 items-center ">
        <Link
          href={"/cart"}
          className="flex gap-2 border border-gray-500 rounded-lg px-4 py-2 hover:text-white hover:bg-black"
        >
          <ShoppingCart />
          <p className="max-lg:hidden">Cart ({cartItems.length})</p>
        </Link>

        <div
          className="relative max-md:block hidden"
          onClick={() => setDropdownMenu((prev) => !prev)}
        >
          {user && <Menu className="cursor-pointer h-8 w-8" />}

          {user && dropdownMenu && (
            <div className="absolute top-10 right-0 flex flex-col p-4 bg-white shadow-xl gap-2 border border-gray-400 rounded-lg ">
              {navLink.map((item) => (
                <Link
                  className="flex gap-2 px-4 py-2 hover:bg-black hover:text-white rounded-lg"
                  href={item.url}
                  key={item.label}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
