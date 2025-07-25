"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useRef, useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary  text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        underlineghost:
          "text-primary underline hover:underline bg-transparent hover:bg-transparent ",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-4xl gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-4xl px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
  readonly fillColor?: string;
  readonly enableHoverAnimation?: boolean;
  readonly animationDuration?: number;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  fillColor = "#000",
  enableHoverAnimation = true,
  animationDuration = 1.5,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillCircleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Calculate the scale needed for the circle to cover the entire button
  const calculateRequiredScale = useCallback(
    (buttonRect: DOMRect, centerX: number, centerY: number): number => {
      // Calculate distances from center point to each corner
      const topLeft = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
      const topRight = Math.sqrt(
        Math.pow(buttonRect.width - centerX, 2) + Math.pow(centerY, 2)
      );
      const bottomLeft = Math.sqrt(
        Math.pow(centerX, 2) + Math.pow(buttonRect.height - centerY, 2)
      );
      const bottomRight = Math.sqrt(
        Math.pow(buttonRect.width - centerX, 2) +
        Math.pow(buttonRect.height - centerY, 2)
      );

      // Get the maximum distance (to the farthest corner)
      const maxDistance = Math.max(topLeft, topRight, bottomLeft, bottomRight);

      // The circle needs to have a diameter of 2 * maxDistance to cover the entire button
      // Since we start with a small circle, we need to scale it up accordingly
      const initialSize = Math.min(buttonRect.width, buttonRect.height) * 0.1; // Start with 10% of the smaller dimension
      const requiredDiameter = maxDistance * 2;

      return requiredDiameter / initialSize;
    },
    []
  );

  // GSAP setup
  useGSAP(() => {
    if (enableHoverAnimation && fillCircleRef.current) {
      gsap.set(fillCircleRef.current, {
        scale: 0,
        opacity: 0,
        borderRadius: "50%",
        width: "20px", // Start with a small fixed size
        height: "20px",
      });
    }
    if (enableHoverAnimation && buttonRef.current) {
      gsap.set(buttonRef.current, {
        scale: 1,
      });
    }
  }, [enableHoverAnimation]);

  // Create ripple effect
  const createRipple = useCallback((x: number, y: number, isClick = false) => {
    if (!buttonRef.current) return;

    const ripple = document.createElement("div");
    ripple.className = "absolute rounded-full pointer-events-none";
    ripple.style.background = `rgba(255, 255, 255, ${isClick ? 0.8 : 0.6})`;

    const size = isClick ? 20 : 30;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    ripple.style.transform = "scale(0)";

    buttonRef.current.appendChild(ripple);

    // Animate ripple
    gsap.to(ripple, {
      scale: isClick ? 3 : 2,
      opacity: 0,
      duration: isClick ? 0.6 : 0.8,
      ease: "power2.out",
      onComplete: () => {
        ripple.remove();
      },
    });
  }, []);

  // Enhanced mouse enter handler
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (
        enableHoverAnimation &&
        !isHovering &&
        !props.disabled &&
        buttonRef.current &&
        fillCircleRef.current
      ) {
        setIsHovering(true);

        // Get mouse position relative to button
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position the circle at the cursor entry point
        gsap.set(fillCircleRef.current, {
          left: `${x}px`,
          top: `${y}px`,
          x: "-50%", // Center the circle on the cursor
          y: "-50%",
          transformOrigin: "center center",
          scale: 0,
          opacity: 1,
          borderRadius: "50%", // Ensure it stays circular
          width: "20px",
          height: "20px",
        });

        // Calculate required scale to fill entire button
        const requiredScale = calculateRequiredScale(rect, x, y);

        // Create ripple effect
        createRipple(x, y);

        // Kill any existing timeline
        if (timelineRef.current) {
          timelineRef.current.kill();
        }

        // Create new timeline for hover in
        timelineRef.current = gsap.timeline();

        timelineRef.current
          .to(
            buttonRef.current,
            {
              scale: 1,
              duration: animationDuration,
              ease: "power2.out",
            },
            0
          )
          .to(
            fillCircleRef.current,
            {
              scale: requiredScale,
              duration: animationDuration,
              ease: "power2.out",
            },
            0
          );
      }

      // Call original onMouseEnter if provided
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    },
    [
      enableHoverAnimation,
      isHovering,
      props.disabled,
      animationDuration,
      createRipple,
      onMouseEnter,
      calculateRequiredScale,
    ]
  );

  // Enhanced mouse leave handler
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (
        enableHoverAnimation &&
        isHovering &&
        !props.disabled &&
        buttonRef.current &&
        fillCircleRef.current
      ) {
        setIsHovering(false);

        // Kill any existing timeline
        if (timelineRef.current) {
          timelineRef.current.kill();
        }

        // Create timeline for hover out
        timelineRef.current = gsap.timeline();

        const exitDuration = animationDuration * 0.3;

        timelineRef.current
          .to(
            buttonRef.current,
            {
              scale: 1,
              duration: exitDuration,
              ease: "power2.out",
            },
            0
          )
          .to(
            fillCircleRef.current,
            {
              scale: 0,
              opacity: 0,
              duration: exitDuration,
              ease: "power2.out",
            },
            0
          );
      }

      // Call original onMouseLeave if provided
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    },
    [
      enableHoverAnimation,
      isHovering,
      props.disabled,
      animationDuration,
      onMouseLeave,
    ]
  );

  // Enhanced click handler
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableHoverAnimation && !props.disabled && buttonRef.current) {
        // Create click ripple effect
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        createRipple(x, y, true);

        // Scale animation for click feedback
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      }

      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }
    },
    [enableHoverAnimation, props.disabled, createRipple, onClick]
  );

  const Comp = asChild ? Slot : "button";

  if (asChild) {
    // When using asChild, we can't add additional elements alongside children
    // So we disable the animation for asChild usage to avoid React.Children.only error
    return (
      <Comp
        ref={buttonRef}
        className={cn(buttonVariants({ variant, size }), className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      ref={buttonRef}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        enableHoverAnimation && "relative overflow-hidden",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {enableHoverAnimation && (
        <div
          ref={fillCircleRef}
          className="pointer-events-none absolute z-0 rounded-full max-md:hidden"
          style={{
            backgroundColor: fillColor,
            width: "20px",
            height: "20px",
          }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
