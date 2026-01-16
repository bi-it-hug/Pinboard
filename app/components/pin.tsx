"use client";

import { useEffect, useId, useState } from "react";
import { LayoutDashboard, LucidePin, LucideTrash2 } from "lucide-react";
import { usePins, type PinData } from "@/components/pin-provider";
import NavigationItem from "@/components/navigation-item";
import Button from "@/components/button";
import Toast from "@/components/toast";
import Image from "next/image";

export default function Pin({ src, alt, mode = "add", onRemove }: { src: string; alt: string; mode?: "add" | "remove"; onRemove?: () => void }) {
    const { addPin, selectedPins } = usePins();
    const pinId = useId();
    const isPinned = selectedPins.some((pin: PinData) => pin.id === pinId);
    const isAddMode = mode === "add";
    const Icon = isAddMode ? LucidePin : LucideTrash2;

    const [showTost, setShowToast] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<string>();

    useEffect(() => {
        let cancelled = false;
        const preload = typeof window === "undefined" ? null : new window.Image();

        if (!preload) {
            return;
        }

        preload.src = src;
        preload.onload = () => {
            if (cancelled) {
                return;
            }
            setAspectRatio(`${preload.naturalWidth} / ${preload.naturalHeight}`);
        };

        return () => {
            cancelled = true;
        };
    }, [src]);

    function handleClick() {
        setShowToast(true);

        if (isAddMode) {
            addPin({ id: pinId, src, alt });
            return;
        }
        onRemove?.();
    }

    return (
        <div className={`group relative mb-4 overflow-hidden rounded-2xl`} style={aspectRatio ? { aspectRatio } : undefined}>
            <Image src={src} alt={alt} className={`pointer-events-none w-full object-cover select-none`} fill />
            <Button size="iconDefault" variant="blur" tooltip={isAddMode ? "Pin to Board" : "Remove from Board"} className={`absolute right-2 bottom-2 opacity-0 transition-all group-hover:opacity-100`} onClick={handleClick} disabled={isAddMode && isPinned}>
                <Icon className="size-5" color="var(--color-neutral-100)" />
            </Button>

            <Toast active={showTost}>
                <p className="ml-1 text-sm leading-none text-neutral-400">Pin added to board.</p>

                <NavigationItem page="board" alt="Board" icon={<LayoutDashboard />} hideLabel>
                    Board
                </NavigationItem>
            </Toast>
        </div>
    );
}
