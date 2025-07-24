import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils"; // utility function for merging classes

// Define the CVA variants
const typographyVariants = cva(
  // Base styles
  "m-0 p-0 font-plus-jakarta-sans focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 focus-visible:rounded-sm print:text-black print:bg-transparent print:no-underline motion-reduce:animate-none",
  {
    variants: {
      variant: {
        h1: "text-[clamp(2rem,5vw,4.5rem)] leading-[110%] font-bold", // 32px to 72px
        h2: "text-[clamp(1.75rem,3.5vw,3.5rem)] leading-[clamp(2rem,4vw,3.85rem)] font-semibold", // 28px to 56px
        h3: "text-[clamp(1.5rem,3vw,3rem)] leading-[130%] font-semibold tracking-[-3%]", // 24px to 48px
        h4: "text-[clamp(1.25rem,2.5vw,2.25rem)] leading-[clamp(1.5rem,3vw,2.475rem)] font-medium", // 20px to 36px
        h5: "text-[clamp(1.125rem,2vw,1.875rem)] leading-[130%] font-medium tracking-[-2%]", // 18px to 30px
        h6: "text-[clamp(1rem,1.5vw,1.5rem)] leading-[clamp(1.25rem,2vw,1.65rem)] font-medium", // 16px to 24px
        body: "text-[clamp(1rem,1.25vw,1.125rem)] leading-[clamp(1.5rem,1.875vw,1.6875rem)] font-normal", // 16px to 18px
        body2:
          "text-[clamp(0.9375rem,1.5vw,1.04rem)] leading-[clamp(1.40625rem,2.25vw,1.875rem)] font-normal", // 15px to 16.5px
        caption:
          "text-[clamp(0.875rem,1vw,1rem)] leading-[clamp(1.3125rem,1.5vw,1.5rem)] font-normal", // 14px to 16px
        overline:
          "text-[clamp(0.75rem,0.875vw,0.875rem)] leading-[clamp(1.125rem,1.3125vw,1.3125rem)] font-medium uppercase tracking-[0.1em]", // 12px to 14px
      },
      weight: {
        100: "font-thin",
        200: "font-extralight",
        300: "font-light",
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
        800: "font-extrabold",
        900: "font-black",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      truncate: {
        true: "overflow-hidden text-ellipsis whitespace-nowrap",
        false: "",
      },
      dir: {
        ltr: "direction-ltr",
        rtl: "direction-rtl text-right",
      },
      isLoading: {
        true: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded text-transparent select-none min-h-[1em]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "body",
      align: "left",
      truncate: false,
      dir: "ltr",
      isLoading: false,
    },
  }
);

// Types
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body2"
  | "caption"
  | "overline";
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type TextAlign = "left" | "center" | "right" | "justify";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof typographyVariants> {
  element?: keyof React.JSX.IntrinsicElements;
  maxLines?: number;
  isLoading?: boolean;
  dir?: "ltr" | "rtl";
  testId?: string;
  children?: React.ReactNode;
}

// Main Typography component
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "body",
      element,
      weight,
      align,
      truncate = false,
      maxLines,
      isLoading = false,
      className,
      style,
      children,
      dir,
      role,
      tabIndex,
      testId,
      ...rest
    },
    ref
  ) => {
    // Determine the HTML element to render
    const getElement = (): keyof React.JSX.IntrinsicElements => {
      if (element) return element;

      switch (variant) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return variant;
        case "body":
        case "body2":
        case "caption":
          return "p";
        case "overline":
          return "span";
        default:
          return "p";
      }
    };

    const Element = getElement();

    // Handle multi-line truncation with inline styles
    const multiLineStyle = maxLines
      ? {
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
        wordWrap: "break-word" as const,
      }
      : {};

    // Combine all styles (style prop takes priority)
    const combinedStyle = {
      ...multiLineStyle,
      ...style,
    };

    return React.createElement(
      Element,
      {
        ref,
        className: cn(
          typographyVariants({
            variant,
            weight,
            align,
            truncate,
            dir,
            isLoading,
          }),
          className
        ),
        style: combinedStyle,
        role,
        tabIndex,
        "data-testid": testId,
        ...rest,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
