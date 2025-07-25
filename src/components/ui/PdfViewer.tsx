'use client';

import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {
    X,
    Download,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Loader2,
    AlertTriangle,
} from 'lucide-react';
import { Button } from './button';
import { useDisableScroll } from '@/lib/hooks';

// Configure the PDF.js worker from a CDN.
// This is a more reliable method and avoids build issues.
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

interface PdfViewerProps {
    fileUrl: string; // URL to the PDF file
    fileName: string; // Name of the PDF file for display and download
    onClose: () => void; // Function to close the viewer
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const SCALE_STEP = 0.2;

export default function PdfViewer({ fileUrl, fileName, onClose }: Readonly<PdfViewerProps>) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(1.4);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Disable background scroll when PDF viewer is open
    useDisableScroll(true);

    /**
     * Callback function for when the document is successfully loaded.
     * @param document - The loaded PDF document proxy.
     */
    const onDocumentLoadSuccess = useCallback((document: { numPages: number }) => {
        setNumPages(document.numPages);
        setIsLoading(false);
    }, []);
    /**
     * Callback function for handling document load errors.
     * @param {Error} error - The error object.
     */
    const onDocumentLoadError = useCallback((error: Error) => {
        setError(`Failed to load PDF: ${error.message}`);
        setIsLoading(false);
    }, []);

    // Zoom control functions
    const zoomIn = () => setScale(prevScale => Math.min(prevScale + SCALE_STEP, MAX_SCALE));
    const zoomOut = () => setScale(prevScale => Math.max(prevScale - SCALE_STEP, MIN_SCALE));
    const resetZoom = () => setScale(1.0);

    /**
     * Handles downloading the PDF file.
     */
    const handleDownload = async () => {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (e) {
            console.error('Failed to download PDF:', e);
            setError('Failed to download PDF.');
        }
    };

    return (
        <div className="fixed  inset-0 z-50 flex flex-col bg-opacity-80 backdrop-blur-sm">
            {/* Header Section */}
            <header className="flex h-16 w-full flex-shrink-0 items-center justify-between  px-4 bg-white shadow-lg">
                <div className="flex items-center gap-4">
                    <span className="truncate font-medium" title={fileName}>
                        {fileName}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Viewing Controls */}
                    <Button onClick={zoomOut} fillColor='#000' variant="outline" disabled={scale <= MIN_SCALE} className="aspect-square rounded-full p-2  hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ZoomOut size={20} />
                    </Button>
                    <span className="w-16 text-center text-sm font-bold">{Math.round(scale * 100)}%</span>
                    <Button onClick={zoomIn} fillColor='#000' variant="outline" disabled={scale >= MAX_SCALE} className="aspect-square rounded-full p-2  hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ZoomIn size={20} />
                    </Button>
                    <Button onClick={resetZoom} fillColor='#000' variant="outline" className="rounded-full p-2  hover:text-white transition-colors" title="Reset Zoom">
                        <RotateCw size={20} />
                    </Button>
                    <div className="h-6 w-px bg-zinc-600 mx-2"></div>
                    {/* Download and Close Buttons */}
                    <Button onClick={handleDownload} fillColor='#000' variant="outline" className="rounded-full p-2  hover:text-white transition-colors" title="Download PDF">
                        <Download size={20} />
                    </Button>
                    <Button onClick={onClose} fillColor='#000' variant="outline" className="rounded-full p-2  hover:text-white transition-colors" title="Close Viewer">
                        <X size={24} />
                    </Button>
                </div>
            </header>

            {/* PDF Content Area */}
            <div className="flex-1 overflow-auto p-4">
                <div className="flex justify-center">
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                            <div className="flex flex-col items-center justify-center h-full text-white">
                                <Loader2 className="animate-spin" size={48} />
                                <p className="mt-4 text-lg">Loading PDF...</p>
                            </div>
                        }
                        error={
                            <div className="flex flex-col items-center justify-center h-full text-white bg-red-900 p-8 rounded-lg">
                                <AlertTriangle size={48} className="text-red-300" />
                                <p className="mt-4 text-lg font-semibold">Error</p>
                                <p className="text-red-200">{error}</p>
                            </div>
                        }
                    >
                        {!isLoading && !error && (
                            <div className="space-y-4">
                                {Array.from(new Array(numPages || 0), (el, index) => (
                                    <div key={`page_${index + 1}`} className="flex justify-center">
                                        <Page
                                            pageNumber={index + 1}
                                            scale={scale}
                                            renderAnnotationLayer={false}
                                            renderTextLayer={false}
                                            className="shadow-2xl"
                                            loading={
                                                <div className="flex items-center justify-center w-[calc(816px*var(--scale-factor))] h-[calc(1056px*var(--scale-factor))] bg-zinc-700 rounded-md">
                                                    <Loader2 className="animate-spin text-white" size={32} />
                                                </div>
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Document>
                </div>
            </div>
        </div>
    );
}
