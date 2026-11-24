import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient animate-gradient text-white shadow-glow hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgb(124_92_255/0.8)]",
  dark: "bg-espresso text-white hover:bg-black hover:-translate-y-0.5 shadow-soft",
  secondary: "bg-white text-espresso ring-1 ring-black/10 hover:ring-brand-300 hover:-translate-y-0.5 hover:shadow-soft",
  ghost: "text-mocha hover:text-espresso hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
  icon?: ReactNode;
}

export function Button({ variant = "primary", size = "md", loading, href, icon, className = "", children, disabled, ...rest }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {loading ? <LoaderCircle className="size-4 animate-spin" /> : icon}
      {children}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
}
