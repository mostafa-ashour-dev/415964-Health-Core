"use client";

import React from "react";
// 1. Swap Next.js imports for react-router-dom
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { buttonStyles } from "./Button";
import type { Variant as ButtonVariant } from "./Button";
import Text from "../text/Text";

type Variant = "link_classic" | "link_modern" | "link_none" | ButtonVariant;

export type LinkProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  transition?: boolean;
  ariaLabel?: string;
  variant?: Variant;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const linkStyles: Record<Variant, string> = {
  link_classic:
    "text-body_text_muted underline hover:text-body_accent_primary transition",
  link_modern: "text-body_text_muted hover:text-body_accent_primary transition",
  link_none: "",
  ...buttonStyles,
};

export default function Link({
  children,
  href,
  className = "",
  transition = false,
  ariaLabel,
  variant = "link_modern",
}: LinkProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const label = ariaLabel || (typeof children === "string" ? children : "Link");

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        className={`${className} ${linkStyles[variant]}`}
        rel="noopener noreferrer"
        aria-label={label}
      >
        <Text
          variant="body_lg"
          className="flex items-center justify-center gap-2"
        >
          {children}
        </Text>
      </a>
    );
  }

  const isSamePage = pathname === href;

  const handleDirectLink = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const body = document.querySelector("body");
    body?.classList.add("fade-out");

    await sleep(300);
    navigate(href);
  };

  return (
    <RouterLink
      onClick={transition && !isSamePage ? handleDirectLink : undefined}
      to={href}
      className={`${className} ${linkStyles[variant]}`}
      aria-label={label}
    >
      <Text variant="body_lg" className="flex items-center justify-center gap-2">{children}</Text>
    </RouterLink>
  );
}
