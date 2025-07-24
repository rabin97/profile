"use client";

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



    return (
        <>
            {items.map((item) => {
                return (
                    <button
                        className="group relative"
                        key={item.name}
                    >
                        {/* <AnimatePresence mode="popLayout">
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
                        </AnimatePresence> */}
                        <Button
                            enableHoverAnimation={false}
                            className="relative flex px-4 hover:bg-white items-center justify-center p-3  rounded-md bg-white  transition"
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
