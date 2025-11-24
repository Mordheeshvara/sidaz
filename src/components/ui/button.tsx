import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent border-2 border-purple-500 text-purple-500 shadow-lg hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200",
        destructive:
          "bg-transparent border-2 border-red-500 text-red-500 shadow-lg hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200",
        outline:
          "border-2 border-purple-500 bg-transparent text-purple-500 dark:text-purple-400 dark:border-purple-400 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200",
        secondary:
          "bg-transparent border-2 border-slate-500 text-slate-400 shadow-lg hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200",
        ghost: 
          "text-purple-500 dark:text-purple-400 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] dark:hover:bg-[#8B5CF6]/20 dark:hover:text-[#8B5CF6] transform hover:scale-105 active:scale-95 transition-all duration-200",
        link: 
          "text-purple-500 dark:text-purple-400 underline-offset-4 hover:underline hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-all duration-200",
        glow:
          "bg-transparent border-2 border-purple-400 text-purple-400 shadow-2xl shadow-purple-500/20 hover:shadow-[#8B5CF6]/40 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transform hover:scale-110 active:scale-95 transition-all duration-300",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base font-semibold",
        xl: "h-14 px-10 text-lg font-bold",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8",
        iconLg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
