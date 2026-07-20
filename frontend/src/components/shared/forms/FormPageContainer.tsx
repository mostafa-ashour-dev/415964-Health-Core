import type React from "react"



type Variant = "form_container_float" | "form_container_static";

type FormContainerProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}


const formContainerStyles: Record<Variant, string>  = {
  form_container_float: "fixed top-0 left-0 max-h-screen overflow-y-scroll bg-black/50",
  form_container_static: "",
} 

export default function FormPageContainer({children, className = "", variant = "form_container_static"}: FormContainerProps ) {
  return (
    <main className={` flex items-center justify-center w-full min-h-screen ${formContainerStyles[variant]} ${className}`} data-variant={variant}>
      {children}
    </main>
  )
}
