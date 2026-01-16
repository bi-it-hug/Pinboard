type Variant = "default" | "secondary" | "blur" | "ghost";
type Size = "default" | "small" | "iconDefault" | "iconDefaultText" | "iconSmall";

type ButtonProps = {
    variant?: Variant;
    size?: Size;
    tooltip?: string;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variant = "default", size = "default", tooltip, disabled, className, children, ...props }: ButtonProps) {
    const variants: Record<Variant, string> = {
        default: "bg-neutral-900 text-neutral-200 dark:text-neutral-800 dark:bg-neutral-200 hover:bg-neutral-900/90 dark:hover:bg-neutral-200/90",
        secondary: "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600",
        blur: "bg-black/50 dark:bg-neutral-700/50 backdrop-blur-lg hover:dark:bg-neutral-800/50",
        ghost: "bg-transparent hover:bg-black/14 dark:hover:bg-white/10",
    };

    const sizes: Record<Size, string> = {
        default: "px-4 py-2 font-semibold rounded-xl gap-1.5",
        small: "px-2 py-1.5 rounded-lg gap-0.5",
        iconDefault: "p-2 text-base rounded-xl gap-1.5",
        iconDefaultText: "p-2 pr-2.5 text-base rounded-xl gap-1.5",
        iconSmall: "p-1 text-xs rounded-lg gap-1.5",
    };

    return (
        <abbr title={tooltip} className={disabled ? "hover:cursor-not-allowed" : ""}>
            <button
                type="button"
                disabled={disabled}
                className={`z-10 flex size-fit items-center justify-center overflow-hidden text-sm outline-transparent focus:outline-black/20 dark:focus:outline-white/15 ${disabled ? "hover:cursor-not-allowed" : "hover:cursor-pointer"} ${variants[variant]} ${sizes[size]} ${className} `}
                {...props}
            >
                {children}
            </button>
        </abbr>
    );
}
