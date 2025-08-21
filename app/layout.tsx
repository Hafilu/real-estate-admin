import Sidebar from "@/components/Sidebar";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Real Estate Admin",
  description: "Static admin panel demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex text-gray-900 bg-gray-100">
          <Sidebar />
          <div className="flex-1 min-h-screen max-w-full overflow-hidden">
            <Navbar />
            <main className="p-4 md:p-6 ">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
