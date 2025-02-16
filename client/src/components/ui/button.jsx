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
        default: "text-primary hover:text-primary/50 font-semibold",
        nav: "hover:bg-foreground-hover rounded-md w-full",
        cancel:
          "text-gray-600 border border-gray-400 hover:bg-gray-100 transition ",
        edit: "text-blue-600 border border-blue-600 hover:bg-blue-100 transition ",
        delete:
          "text-white bg-red-500 border border-red-500 hover:bg-red-600 transition ",
        save: "text-white bg-green-500 border border-green-500 hover:bg-green-600 transition ",

        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // my style
        follow:
          "bg-blue-500 hover:bg-blue-700 text-gray-200 duration-300 font-medium",

        following:
          "bg-gray-200 hover:bg-gray-300 text-gray-800 duration-300 dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-200 font-medium ",
      },
      size: {
        default: "h-10 rounded-md py-1 px-4 text-sm min-w-24",
        xs: "h-7 rounded-md py-2 px-2 text-xs",
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
