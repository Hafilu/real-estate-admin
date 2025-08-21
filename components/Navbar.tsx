"use client";
import { NavItems } from "@/lib/data";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  // Find the active item from the sidebar config
  const activeItem = NavItems.find((i) => i.href === pathname);
  const title = activeItem ? activeItem.label : "Dashboard";
  return (
    <header className="bg-white min-h-[53px] border-b shadow border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg pl-7 lg:pl-0 font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">Hello, Admin</div>
        <Image src="/avatar.webp" className="rounded-full" alt="avatar" height={30} width={30}/>
      </div>
    </header>
  );
}
