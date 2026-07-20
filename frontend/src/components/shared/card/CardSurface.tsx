import React from "react";




type Variant = "card_surface_classic" | "card_surface_modern";

export type CardSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};


const cardSurfaceStyles: Record<Variant, string> = {
  card_surface_classic: "bg-body_background_secondary rounded-card_classic",
  card_surface_modern: "bg-body_background_secondary rounded-card_modern",
};

export default function CardSurface({children, className = "", variant="card_surface_modern"}: CardSurfaceProps) {
  return (
    <div className={`${cardSurfaceStyles[variant]} ${className} border-1 border-body_border_primary`}>{children}</div>
  )
}
