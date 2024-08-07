import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-dark text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        popular: "",
        link: "text-primary underline-offset-4 hover:underline",
        marketing: "bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] text-light font-bold text-lg",
        darkSwich: "bg-dark hover:bg-dark/80 dark:bg-light dark:hover:bg-light/90 text-light dark:text-dark",
        directLink: "bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] text-light",
        authButton: "bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] text-light text-base font-bold",
        sidebarToggle: "bg-dark hover:bg-[#3D3839] dark:bg-light dark:hover:bg-[#E6E1DA]",
        like: ""
      },
      size: {
        default: "h-10 px-4 py-2",
        popularSize: "h-10 px-1 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
        like: "p-0"
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
