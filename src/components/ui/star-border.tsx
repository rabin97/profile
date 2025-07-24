import React from "react";

type StarBorderProps<T extends React.ElementType> =
    React.ComponentPropsWithoutRef<T> & {
        as?: T;
        className?: string;
        children?: React.ReactNode;
        color?: string;
        speed?: React.CSSProperties['animationDuration'];
        thickness?: number;
    }

const StarBorder = <T extends React.ElementType = "div">({
    as,
    className = "",
    color = "white",
    speed = "6s",
    thickness = 1,
    children,
    ...rest
}: StarBorderProps<T>) => {
    const Component = as ?? "div";

    return (
        <Component
            className={`relative inline-block overflow-hidden rounded-lg ${className}`}
            {...(rest as React.HTMLProps<HTMLDivElement>)}
            style={{
                padding: `${thickness}px 0`,
                ...(rest as React.HTMLProps<HTMLDivElement>).style,
            }}
        >
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="relative z-10 bg-gray-800 p-4 rounded-lg">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
