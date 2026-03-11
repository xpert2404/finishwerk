"use client";

import { siteConfig } from "@/content/site";

export function CalEmbed() {
  const embedUrl = `${siteConfig.booking.calUrl}?embed=true&theme=light`;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
      <iframe
        src={embedUrl}
        title="Cal.com Terminbuchung"
        className="h-[620px] w-full bg-white"
        loading="lazy"
        allow="payment"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
