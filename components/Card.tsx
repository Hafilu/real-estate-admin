import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

export default function Card({ children, className, bgImage }: CardProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden  rounded-2xl shadow-sm p-4 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1 hover:bg-indigo-50",
        className
      )}
    >
      {bgImage && (
        <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none opacity-20">
          <Image src={bgImage} alt="bg" fill className="object-contain" />
        </div>
      )}

      <div className="relative z-10 mt-2">{children}</div>
    </div>
  );
}
