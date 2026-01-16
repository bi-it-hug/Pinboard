"use client";

import { LucideRefreshCcw } from "lucide-react";
import Button from "@/components/button";

export default function Regenerate() {
    async function regenerate() {
        // Clear any cached images first
        localStorage.removeItem("images");

        try {
            const res = await fetch(`/api`, { cache: "no-store" });

            if (!res.ok) {
                console.error("Failed to fetch images", await res.text());
                return;
            }

            const data = await res.json();

            // Persist the new images so the main page can pick them up
            localStorage.setItem("images", JSON.stringify(data));

            // Notify listeners (e.g. the home page) that images have changed
            window.dispatchEvent(new Event("imagesUpdated"));
        } catch (error) {
            console.error("Error regenerating images", error);
        }
    }

    return (
        <Button variant="ghost" size="iconDefault" tooltip="Regenerate Images" onClick={regenerate}>
            <LucideRefreshCcw />
        </Button>
    );
}
