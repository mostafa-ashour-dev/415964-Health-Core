"use client";

import React from "react";
import Text from "../text/Text";
import Spinner from "../animation/Spinner";

export type Variant =
  | "button_modern_primary"
  | "button_modern_secondary"
  | "button_classic_primary"
  | "button_classic_secondary";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  onClick?<T>(event: React.MouseEvent<T>): void;
  transition?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

export const buttonStyles: Record<Variant, string> = {
  button_modern_primary:
    "flex items-center justify-center w-fit rounded-full font-semibold p-button bg-body_accent_primary text-body_accent_secondary hover:bg-body_accent_secondary hover:text-body_text_primary transition",
  button_modern_secondary:
    "flex items-center justify-center w-fit rounded-full font-semibold p-button bg-body_accent_secondary text-body_text_primary hover:bg-body_accent_primary hover:text-body_accent_secondary transition",
  button_classic_primary:
    "flex items-center justify-center w-fit rounded-button_classic font-semibold p-button bg-body_accent_primary text-body_accent_secondary hover:bg-body_accent_secondary hover:text-body_accent_primary transition",
  button_classic_secondary:
    "flex items-center justify-center w-fit rounded-button_classic font-semibold p-button bg-body_accent_secondary text-body_accent_primary hover:bg-body_accent_primary hover:text-body_accent_secondary transition",
};

export default function Button({
  children,
  className,
  onClick,
  variant = "button_modern_primary",
  ariaLabel,
  disabled = false,
  loading = false,
  type = "button",
}: ButtonProps) {

  const label =
    ariaLabel || (typeof children === "string" ? children : "Button");


    return (
      <button
        disabled={disabled}
        suppressHydrationWarning
        onClick={onClick}
        className={`relative ${buttonStyles[variant || "primary"]} ${className} ${disabled || loading ? "bg-body_background_disabled text-body_text_disabled hover:bg-body_background_disabled hover:!text-body_text_disabled !cursor-not-allowed" : ""}`}
        aria-label={label}
        type={type}
      >
        <Spinner
          variant="spinner_sm"
          className={`${loading ? "opacity-100" : "opacity-0"} transition absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        />
        <Text
          variant="body_lg"
          className={`${loading ? "opacity-0" : "opacity-100"} transition flex items-center justify-center gap-2`}
        >
          {children}
        </Text>
      </button>
    );
  
}
