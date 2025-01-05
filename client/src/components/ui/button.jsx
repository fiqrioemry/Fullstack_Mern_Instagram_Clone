/* eslint-disable react/prop-types */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: " text-primary hover:text-primary/50 font-semibold",
        follow: "bg-follow hover:bg-follow-hover text-primary h-10 shadow-sm",
        nav: "hover:bg-foreground-hover rounded-md w-full",
        ghost:
          "bg-foreground hover:bg-foreground-hover text-primary rounded-md",
        delete: "bg-foreground text-red-500  hover:bg-foreground-hover w-full ",
      },
      size: {
        default: "h-7 rounded-md py-2 px-4 text-sm",
        sm: "h-8 rounded-md py-2 px-4 text-sm",
        md: "h-9 rounded-md px-3 py-5 text-md",
        lg: "h-12 rounded-md px-3 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
