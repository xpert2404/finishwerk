"use client";

import {Button} from "@/components/ui/button";
import {useBooking} from "@/components/booking/BookingProvider";
import {trackCTA} from "@/lib/analytics";

interface BookingButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  ctaId?: string;
  position?: string;
}

export function BookingButton({
  children,
  className,
  variant = "default",
  size = "default",
  ctaId = "booking_button",
  position = "unspecified"
}: BookingButtonProps) {
  const {openBooking} = useBooking();

  return (
    <Button
      type="button"
      className={className}
      variant={variant}
      size={size}
      onClick={() => {
        trackCTA({ctaId, position});
        openBooking();
      }}
    >
      {children}
    </Button>
  );
}

