import MasonryGrid from "@/components/masonry-grid";

export default function Loading() {
    const placeholders = Array.from({ length: 30 });

    return (
        <MasonryGrid>
            {placeholders.map((_, index) => (
                <div key={index} className="mb-4 h-[220px] w-full animate-pulse overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800"></div>
            ))}
        </MasonryGrid>
    );
}
