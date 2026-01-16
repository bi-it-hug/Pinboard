"use client";

import Button from "@/components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationItem({ page, icon, alt, hideLabel, children }: { page: string; icon?: React.ReactNode; alt: string; hideLabel?: boolean; children: React.ReactNode }) {
    const pathname = usePathname();
    const href = `/${page}`;

    // Exact match; change this to pathname.startsWith(href) if you want prefix matching
    const isActive = pathname === href;

    return (
        <Link href={href} aria-current={isActive ? "page" : undefined}>
            <Button variant="ghost" size={hideLabel ? "iconDefault" : "iconDefaultText"} tooltip={alt} className={`relative`} data-active={isActive ? "true" : "false"}>
                {icon}
                {!hideLabel && children}
            </Button>
        </Link>
    );
}
