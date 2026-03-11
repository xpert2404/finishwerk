import {cn} from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "hero";
}

const sizeClassMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  hero: "max-w-[90rem]"
};

export function Container({children, className, size = "default"}: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizeClassMap[size], className)}>{children}</div>;
}
