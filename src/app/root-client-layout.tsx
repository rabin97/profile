"use client";
import React from 'react';
import { LoadingProvider, useLoading } from '@/components/providers/loading-provider';
import PageLoader from '@/components/ui/page-loader';

interface ClientWrapperProps {
    children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
    const { isLoading } = useLoading();

    return (
        <>
            <PageLoader isLoading={isLoading} />
            <div
                className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {children}
            </div>
        </>
    );
};

interface RootClientLayoutProps {
    children: React.ReactNode;
}

const RootClientLayout: React.FC<RootClientLayoutProps> = ({ children }) => {
    return (
        <LoadingProvider>
            <ClientWrapper>
                {children}
            </ClientWrapper>
        </LoadingProvider>
    );
};

export default RootClientLayout;
