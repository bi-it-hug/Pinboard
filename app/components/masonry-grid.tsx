"use client";

import { useRef, useState, type UIEvent } from "react";
import { ChevronUp } from "lucide-react";
import Button from "@/components/button";

export default function MasonryGrid({ children }: { children: React.ReactNode }) {
    const [scrollTop, setScrollTop] = useState(0);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    function handleScroll(event: UIEvent<HTMLDivElement>) {
        const el = event.currentTarget;
        const { scrollTop, scrollHeight, clientHeight } = el;
        setScrollTop(scrollTop);
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    }

    function scrollToTop() {
        if (!containerRef.current) return;

        containerRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div ref={containerRef} onScroll={handleScroll} className="h-full w-full overflow-x-hidden overflow-y-auto p-4">
            <div
                className={`pointer-events-none fixed top-0 left-0 z-1 min-h-[300px] w-full bg-linear-to-b from-white from-0% to-transparent mask-b-from-black mask-b-from-10% mask-b-to-transparent backdrop-blur-xl transition-opacity duration-500 dark:from-black/85 ${scrollTop > 50 ? "opacity-100" : "opacity-0"}`}
            ></div>

            <div className={`w-full columns-1 gap-4 rounded-2xl sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6`}>
                {children}
                <Button size="iconDefault" variant="blur" tooltip={`Return to Top`} className={`fixed right-10 bottom-10 transition-all ${scrollTop > 150 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={scrollToTop}>
                    <ChevronUp />
                </Button>
            </div>
            <div
                className={`pointer-events-none fixed bottom-0 left-0 z-1 min-h-[300px] w-full bg-linear-to-t from-white from-0% to-transparent mask-t-from-black mask-t-from-10% mask-t-to-transparent backdrop-blur-xl transition-opacity duration-500 dark:from-black/85 ${isAtBottom ? "opacity-0" : "opacity-100"}`}
            ></div>
        </div>
    );
}
