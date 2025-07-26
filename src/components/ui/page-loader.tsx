"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
    isLoading: boolean;
    className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, className }) => {
    if (!isLoading) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex items-center justify-center bg-background",
                "transition-opacity duration-500",
                className
            )}
        >
            <div className="flex flex-col items-center space-y-4">
                {/* Logo Animation */}
                <div className="relative">
                    <div className="animate-pulse">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-6xl font-bold font-playfair-display text-transparent">
                            RK
                        </span>
                    </div>

                    {/* Loading Ring */}
                    <div className="absolute inset-0 -m-4 ">
                        <div className="animate-spin rounded-full h-28 w-28 border-2 border-transparent border-t-blue-500 border-r-purple-500"></div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="text-muted-foreground text-sm mt-4 font-roboto">
                    Loading...
                </div>

                {/* Progress Bar */}
                <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
