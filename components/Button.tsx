import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg cursor-pointer hover:shadow hover:bg-blue-50 font-medium shadow-sm bg-blue-100 text-gray-700 transition-all duration-200 " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
