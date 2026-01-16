export default function Sidebar({ children }: { children: React.ReactNode }) {
    return <section className="z-10 flex h-screen w-12 flex-none flex-col gap-1.5 bg-neutral-200 p-2 dark:bg-[#202020]">{children}</section>;
}
