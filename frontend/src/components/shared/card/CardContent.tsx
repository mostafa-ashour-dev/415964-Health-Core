



type Variant = "card_content_xs" | "card_content_sm" | "card_content_md" | "card_content_lg";

export type CardContentProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  direction?: "row" | "col";
};


const cardContentStyles: Record<Variant, string> = {
  card_content_xs: "py-3 px-6",
  card_content_sm: "py-5 px-10",
  card_content_md: "py-7 px-12",
  card_content_lg: "py-9 px-14",
};

export default function CardContent({children, variant = "card_content_md", className = "", direction}: CardContentProps) {

  return (
    <div className={`w-full flex ${cardContentStyles[variant]} ${className} ${direction === "row" ? "flex-row" : "flex-col"}`}>
      {children}
    </div>
  )
}
