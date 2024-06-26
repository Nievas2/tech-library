import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-light dark:text-dark bg-dark dark:bg-light flex w-full rounded-md borde border-main text-sm p-2.5 disabled:cursor-not-allowed disabled:opacity-50 bg-background ring-offset-background file:border-0 file:bg-light file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-main",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
