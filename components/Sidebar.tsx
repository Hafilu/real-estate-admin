"use client";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavItems } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-2 left-0 z-50 p-2 bg-blue-100 rounded-md "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-white shadow border-r border-gray-200 fixed top-0 left-0 lg:h-screen h-full z-50 lg:static flex flex-col transition-all duration-300",
          // mobile drawer
          open
            ? "translate-x-0 w-56"
            : "-translate-x-full w-56 lg:translate-x-0",
          // desktop collapse
          collapsed && "lg:w-16",
          !collapsed && "lg:w-56"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-gray-300 border-b">
          <div className="flex items-center gap-2">
            {!collapsed && <span className="font-bold">RealAdmin</span>}
          </div>
          {/* Collapse toggle (desktop) */}
          <button
            aria-label="toggle collapse"
            onClick={() => setCollapsed((v) => !v)}
            className="hidden lg:block p-2 rotate-90 rounded-md hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {/* Close button (mobile) */}
          <button
            aria-label="close drawer"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {NavItems.map((i) => {
            const isActive = pathname === i.href;

            return (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="block"
              >
                <div
                  className={clsx(
                    "flex items-center gap-3 p-2 rounded-md transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-800 font-medium"
                      : "hover:bg-gray-100"
                  )}
                >
                  <Image
                    src={i.icon}
                    alt={collapsed ? i.label : ""}
                    title={collapsed ? i.label : ""}
                    aria-hidden={collapsed ? "false" : "true"}
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  {!collapsed && <span className="text-sm">{i.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer (Logout) */}
        <div className="p-2 text-left border-gray-300 border-t">
          <button className="text-sm cursor-pointer py-2 px-3 flex items-center gap-2 rounded-md hover:bg-gray-100">
            <Image
              src={"/logout.svg"}
              alt="logout icon"
              title="Logout"
              height={25}
              width={25}
            />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
