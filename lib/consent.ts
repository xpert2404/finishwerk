const BOOKING_CONSENT_KEY = "finishwerk.vendor-consent.booking.v1";

export function readBookingConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(BOOKING_CONSENT_KEY) === "granted";
}

export function writeBookingConsent() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(BOOKING_CONSENT_KEY, "granted");
}
