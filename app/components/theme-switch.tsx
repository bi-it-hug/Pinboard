"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import Button from "@/components/button";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    const iconStyles = "text-neutral-800 dark:text-neutral-100";
    const oppositeValue = theme === "dark" ? "light" : "dark";

    return (
        <Button variant="ghost" size="iconDefault" tooltip={`Switch Theme to ${oppositeValue}`} onClick={() => setTheme(oppositeValue)}>
            {theme === "dark" ? <LucideSun className={iconStyles} /> : <LucideMoon className={iconStyles} />}
        </Button>
    );
}
