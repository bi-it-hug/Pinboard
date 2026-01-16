export default function Toast({ active = false, className, children }: { active?: boolean; className?: string; children: React.ReactNode }) {
    return (
        <div
            className={`fixed bottom-3 left-1/2 z-20 size-fit -translate-x-1/2 translate-y-[calc(100%+12px)] items-center justify-center gap-1.5 rounded-2xl bg-black/50 p-2 backdrop-blur-lg transition-all will-change-transform dark:bg-neutral-700/50 ${active ? "animate-toast flex" : "hidden"} ${className}`}
        >
            {children}
        </div>
    );
}
