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
        normal: "w-full border-muted-foreground/25",
        default: "font-semibold",
        primary: "bg-accent text-foreground hover:bg-foreground/20",
        secondary: "bg-foreground text-background hover:bg-foreground/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        nav: "hover:bg-accent flex md:justify-start gap-x-3 w-full capitalize",
        custom:
          "bg-custom hover:bg-custom/80 text-background dark:text-foreground",
      },
      size: {
        normal: "h-12 py-4",
        default: "h-6 py-3",
        sm: "h-6 rounded-md px-3 py-3 text-sm",
        md: "h-9 rounded-md px-3 py-3 text-md",
        lg: "h-12 rounded-md px-3 py-3 text-lg",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "normal",
      size: "normal",
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
