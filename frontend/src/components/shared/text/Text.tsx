import React from "react";

type Variant =
  | "body_6xl"  
  | "body_5xl"  
  | "body_4xl"  
  | "body_3xl"
  | "body_2xl"
  | "body_xl"
  | "body_lg"
  | "body_md"
  | "body_sm"
  | "body_xs"
  ;

type TextTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "label"
  | "caption"
  | "figcaption"
  | "strong"
  | "b"
  | "em"
  | "i"
  | "small"
  | "sub"
  | "sup"
  | "blockquote"
  | "q"
  | "code"
  | "pre"
  | "time"
  | "address";

export type TextProps = {
  children: React.ReactNode;
  variant?: Variant;
  as?: TextTags;
  className?: string;
  name?: string;
};

const textSizes: Record<Variant, string> = {
  body_6xl: "text-6xl",
  body_5xl: "text-5xl",
  body_4xl: "text-4xl",
  body_3xl: "text-3xl",
  body_2xl: "text-2xl",
  body_xl: "text-xl",
  body_lg: "text-lg",
  body_md: "text-base",
  body_sm: "text-sm",
  body_xs: "text-xs",
};

export default function Text({
  children,
  as: Component = "p",
  variant = "body_md",
  className = "",
}: TextProps) {
  return (
    <Component
      aria-label={typeof children === "string" ? children : undefined}
      className={` ${className} ${textSizes[variant]}`}
    >
      {children}
    </Component>
  );
}
