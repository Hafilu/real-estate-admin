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
          <div className="flex flex-col h-screen w-full overflow-hidden">
            {/* Fixed Navbar */}
            <Navbar  />

            {/* Main content scrolls */}
            <main className="flex-1 custom p-4 md:p-6   overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
