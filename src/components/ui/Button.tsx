"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-400 hover:bg-orange-500 text-white border-b-4 border-orange-600 active:border-b-0 active:translate-y-1",
  secondary:
    "bg-teal-400 hover:bg-teal-500 text-white border-b-4 border-teal-600 active:border-b-0 active:translate-y-1",
  danger:
    "bg-red-400 hover:bg-red-500 text-white border-b-4 border-red-600 active:border-b-0 active:translate-y-1",
  ghost:
    "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 text-base rounded-2xl",
  lg: "px-8 py-3 text-lg rounded-2xl",
  xl: "px-10 py-4 text-2xl rounded-3xl",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      className={`
        font-bold transition-colors duration-150 select-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
