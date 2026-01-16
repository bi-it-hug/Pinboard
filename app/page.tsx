"use client";

import Pin from "@/components/pin";
import MasonryGrid from "@/components/masonry-grid";
import { useEffect, useState } from "react";
import type { UnsplashImage } from "@/types/UnsplashImage";

export default function Home() {
    const [images, setImages] = useState<UnsplashImage[]>([]);

    async function fetchImages() {
        try {
            const res = await fetch(`/api`, { cache: "no-store" });

            if (!res.ok) {
                console.error("Failed to fetch images", await res.text());
                return;
            }

            const data: UnsplashImage[] = await res.json();
            setImages(data);

            localStorage.setItem("images", JSON.stringify(data));
        } catch (error) {
            console.error("Error fetching images", error);
        }
    }

    useEffect(() => {
        const loadInitialImages = () => {
            const storedImages = localStorage.getItem("images");

            if (storedImages) {
                const savedImages = JSON.parse(storedImages);
                setImages(savedImages);
            } else {
                void fetchImages();
            }
        };

        loadInitialImages();

        const handleImagesUpdated = () => {
            const storedImages = localStorage.getItem("images");
            if (!storedImages) return;

            try {
                const updatedImages = JSON.parse(storedImages);
                setImages(updatedImages);
            } catch (error) {
                console.error("Failed to parse updated images from localStorage", error);
            }
        };

        window.addEventListener("imagesUpdated", handleImagesUpdated);

        return () => {
            window.removeEventListener("imagesUpdated", handleImagesUpdated);
        };
    }, []);

    return (
        <MasonryGrid>
            {images.map((image, index) => (
                <Pin key={index} src={image.urls.small} alt={image.alt_description ?? "Unsplash image"} />
            ))}
        </MasonryGrid>
    );
}
