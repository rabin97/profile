"use client";

import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "motion/react";
import { Progress } from "./progress";
import Typography from "./typography";
import Image from "next/image";
import { Button } from "./button";


export const TechSkills = ({
    items,
}: {
    items: {
        id: number;
        name: string;
        value: number;
        icon?: string;
    }[];
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0); // going to set this value on mouse move
    // rotate the tooltip
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig,
    );
    // translate the tooltip
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig,
    );
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
    };

    return (
        <>
            {items.map((item) => {
                return (
                    <button
                        onMouseEnter={() => setHoveredIndex(item.id)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative"
                        key={item.name}
                    >
                        <AnimatePresence mode="popLayout">
                            {hoveredIndex === item.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 10,
                                        },
                                    }}
                                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                    style={{
                                        translateX: translateX,
                                        rotate: rotate,
                                        whiteSpace: "nowrap",
                                    }}
                                    className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
                                >
                                    <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                                    <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                                    <div className="relative z-30 text-base font-bold text-white">
                                        {item.name}
                                    </div>
                                    <div className="w-full mt-2">
                                        <Progress
                                            value={item.value}
                                            className="w-full h-2 bg-gray-700"
                                        />
                                        <div className="text-xs text-gray-300 mt-1 text-center">
                                            {item.value}%
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Button
                            enableHoverAnimation={false}
                            onMouseMove={handleMouseMove}
                            className="relative flex px-4 hover:bg-white items-center justify-center p-3 border rounded-md bg-white hover:shadow-md transition"
                        >
                            {item.icon && (
                                <Image
                                    width={20}
                                    height={20}
                                    src={item.icon}
                                    alt={item.name}
                                    className="  object-contain"
                                />
                            )}
                            <Typography variant="body2" className="text-muted-foreground text-center">
                                {item.name}
                            </Typography>
                        </Button>

                    </button>

                )
            })}
        </>
    );
};
