"use client";

import { useBooking } from "@/components/booking/booking-provider";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type BookingButtonProps = {
  label?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function BookingButton({
  label,
  children,
  variant = "primary",
  className,
}: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <Button onClick={openBooking} variant={variant} className={className}>
      {children ?? label}
    </Button>
  );
}
