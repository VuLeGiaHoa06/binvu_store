import { Heart, LayoutGrid, ShoppingBag } from "lucide-react";

export const navLink = [
  {
    url: "/",
    icon: <LayoutGrid />,
    label: "Home",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/wishlist",
    icon: <Heart />,
    label: "Wishlist",
  },
];
