



type Variant = "spinner_sm" | "spinner_md" | "spinner_lg";

export type SpinnerProps = {
    className?: string;
    variant?: Variant;
}


const spinnerStyles: Record<Variant, string> = {
    spinner_sm: "w-[20px] h-[20px]",
    spinner_md: "w-[40px] h-[40px]",
    spinner_lg: "w-[60px] h-[60px]",
} 

const spinnerBorderStyles: Record<Variant, string> = {
  spinner_sm: "border-2",
  spinner_md: "border-4",
  spinner_lg: "border-6",
};

export default function Spinner({variant = "spinner_md", className = ""}: SpinnerProps) {
  return (
    <div className={`${spinnerStyles[variant]} ${className}`}>
      <div className={`w-full h-full bg-transparent ${ spinnerBorderStyles[variant] } border-r-transparent border-body_text_disabled rounded-full animate-spin`}></div>
    </div>
  );
}
