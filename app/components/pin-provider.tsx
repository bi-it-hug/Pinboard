"use client";

import { createContext, useState, useContext } from "react";

type PinData = {
    id: string;
    src: string;
    alt: string;
};

type PinContextType = {
    selectedPins: PinData[];
    addPin: (pin: PinData) => void;
    removePin: (pinId: string) => void;
};

const PinContext = createContext<PinContextType | undefined>(undefined);

function PinProvider({ children }: { children: React.ReactNode }) {
    const [selectedPins, setSelectedPins] = useState<PinData[]>([]);

    const addPin = (pin: PinData) => setSelectedPins((prev) => (prev.some((existing) => existing.id === pin.id) ? prev : [...prev, pin]));
    const removePin = (pinId: string) => setSelectedPins((prev) => prev.filter((pin) => pin.id !== pinId));

    return <PinContext.Provider value={{ selectedPins, addPin, removePin }}>{children}</PinContext.Provider>;
}

function usePins() {
    const context = useContext(PinContext);
    if (!context) throw new Error("usePins must be used within a PinProvider");
    return context;
}

export type { PinData };
export { PinProvider, usePins };
