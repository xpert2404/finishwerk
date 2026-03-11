import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  newTab?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg" | "icon";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  newTab = false,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseClassName = cn(
    "inline-flex items-center justify-center rounded-full border text-sm font-semibold tracking-[0.01em]",
    "focus-visible:outline-none",
    size === "md" && "h-12 px-5",
    size === "lg" && "h-14 px-6 text-base",
    size === "icon" && "h-11 w-11",
    variant === "primary" &&
      "border-[var(--accent-border)] bg-[var(--accent)] text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_22px_55px_rgba(0,0,0,0.44)]",
    variant === "secondary" &&
      "border-white/10 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]",
    variant === "ghost" &&
      "border-white/8 bg-white/[0.02] text-white hover:bg-white/[0.06]",
    className,
  );

  if (href) {
    const isInternalRoute = href.startsWith("/");
    const isAnchor = href.startsWith("#");

    if (isInternalRoute) {
      return (
        <Link href={href} className={baseClassName}>
          {children}
        </Link>
      );
    }

    return (
      <a
        className={baseClassName}
        href={href}
        {...(isAnchor
          ? {}
          : newTab
            ? { rel: "noreferrer", target: "_blank" }
            : { rel: "noreferrer" })}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={baseClassName} {...props}>
      {children}
    </button>
  );
}
