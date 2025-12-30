"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type MediaData = {
    src: string;
    type: "image" | "video";
    orientation: "landscape" | "portrait" | "unknown";
};

type ProjectGalleryProps = {
    images: string[];
    projectTitle: string;
};

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
    const [mediaData, setMediaData] = useState<MediaData[]>(
        images.map((src) => ({
            src,
            type: (src.endsWith('.mp4') || src.endsWith('.webm')) ? "video" : "image",
            orientation: "unknown"
        }))
    );
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Called when each image loads — we read its natural dimensions
    const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const orientation: "landscape" | "portrait" =
            img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait";

        setMediaData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], orientation };
            return updated;
        });
    };

    // Called when video metadata loads
    const handleVideoLoad = (index: number, event: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = event.currentTarget;
        const orientation: "landscape" | "portrait" =
            video.videoWidth >= video.videoHeight ? "landscape" : "portrait";

        setMediaData((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], orientation };
            return updated;
        });
    };

    // Modal controls
    const openModal = (index: number) => setSelectedIndex(index);
    const closeModal = () => setSelectedIndex(null);

    const goToPrev = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }, [selectedIndex, images.length]);

    const goToNext = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }, [selectedIndex, images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };

        document.addEventListener("keydown", handleKeyDown);
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedIndex, goToPrev, goToNext]);

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
                {mediaData.map((media, index) => {
                    const isLandscape = media.orientation === "landscape";
                    const isPortrait = media.orientation === "portrait";

                    return (
                        <button
                            key={index}
                            onClick={() => openModal(index)}
                            className={`
                                relative border border-white/10 overflow-hidden 
                                hover:border-primary/50 transition-colors cursor-pointer
                                bg-dark-grey flex items-center justify-center
                                ${isLandscape ? "col-span-2 h-48 md:h-64" : ""}
                                ${isPortrait ? "col-span-1 h-64 md:h-80" : ""}
                                ${media.orientation === "unknown" ? "col-span-1 h-48 md:h-64" : ""}
                            `}
                        >
                            {media.type === "video" ? (
                                <video
                                    src={media.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    onLoadedMetadata={(e) => handleVideoLoad(index, e)}
                                    className="absolute inset-0 w-full h-full object-contain p-2"
                                />
                            ) : (
                                <Image
                                    src={media.src}
                                    alt={`${projectTitle} screenshot ${index + 1}`}
                                    fill
                                    className="object-contain p-2"
                                    unoptimized={media.src.endsWith(".gif")}
                                    onLoad={(e) => handleImageLoad(index, e)}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Modal Overlay - rendered via Portal to escape parent containers */}
            {selectedIndex !== null &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
                        onClick={closeModal}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                            aria-label="Close"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Prev button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrev();
                                }}
                                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>
                        )}

                        {/* Next button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        )}

                        {/* Media container */}
                        <div
                            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {mediaData[selectedIndex].type === "video" ? (
                                <video
                                    src={images[selectedIndex]}
                                    controls
                                    autoPlay
                                    loop
                                    className="max-w-full max-h-[85vh] w-auto h-auto"
                                />
                            ) : (
                                <Image
                                    src={images[selectedIndex]}
                                    alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                                    width={1920}
                                    height={1080}
                                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                                    unoptimized={images[selectedIndex].endsWith(".gif")}
                                />
                            )}
                        </div>

                        {/* Media counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                                {selectedIndex + 1} / {images.length}
                            </div>
                        )}
                    </div>,
                    document.body
                )}
        </>
    );
}
