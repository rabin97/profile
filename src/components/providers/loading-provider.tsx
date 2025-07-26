"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    showLoader: () => void;
    hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

interface LoadingProviderProps {
    children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        // Show loader on initial page load
        const handleLoad = () => {
            // Add a small delay to ensure all components are mounted
            setTimeout(() => {
                setIsLoading(false);
                setIsFirstLoad(false);
            }, 1000); // Adjust timing as needed
        };

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Handle page visibility changes (for better UX on tab switching)
        const handleVisibilityChange = () => {
            if (document.hidden) return;

            // If user comes back to tab and it's been a while, show loader briefly
            if (!isFirstLoad && document.visibilityState === 'visible') {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 300);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('load', handleLoad);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isFirstLoad]);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    const value = React.useMemo(() => ({
        isLoading,
        setIsLoading,
        showLoader,
        hideLoader,
    }), [isLoading]);

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
