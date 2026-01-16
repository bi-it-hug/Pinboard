"use client";

import MasonryGrid from "@/components/masonry-grid";
import { usePins } from "@/components/pin-provider";
import Pin from "@/components/pin";

export default function Board() {
    const { selectedPins, removePin } = usePins();

    if (!selectedPins.length) {
        return (
            <div className="flex h-screen flex-col items-center justify-center text-center">
                <p className="text-lg font-medium">Your board is empty.</p>
                <p className="text-sm text-neutral-400">Add pins from the home page to see them here.</p>
            </div>
        );
    }

    return (
        <MasonryGrid>
            {selectedPins.map((pin) => (
                <Pin key={pin.id} src={pin.src} alt={pin.alt} mode="remove" onRemove={() => removePin(pin.id)} />
            ))}
        </MasonryGrid>
    );
}
