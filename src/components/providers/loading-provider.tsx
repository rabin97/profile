"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';

interface LoadingContextType {
    isLoading: boolean;
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

    useEffect(() => {
        // Let the loader show for a brief moment to prevent layout shift
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 200); // Just 200ms to hide flash of unstyled content

        return () => clearTimeout(timeout);
    }, []);

    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    const value = React.useMemo(
        () => ({
            isLoading,
            showLoader,
            hideLoader,
        }),
        [isLoading]
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};
