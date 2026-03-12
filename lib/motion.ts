/* ─── FinishWerk Motion System ─────────────────────────────
   Central timing, easing, and animation variant definitions.
   All motion components reference these values for consistency.
   ────────────────────────────────────────────────────────── */

export type MotionPreset = "fade-up" | "scale-in" | "soft-parallax" | "fade-left";

/* ── Timing (seconds) ──────────────────────── */

export const motionTiming = {
    micro: 0.16,
    fast: 0.18,
    normal: 0.26,
    slow: 0.34,
    section: 0.42,
    chart: 1.2,
    loader: 0.7,
} as const;

/* ── Easing Curves ──────────────────────────── */

export const motionEasing = {
    /** Primary reveal: smooth overshoot */
    reveal: [0.22, 1, 0.36, 1] as const,
    /** Standard motion: controlled decel */
    standard: [0.2, 0.8, 0.2, 1] as const,
    /** Hover / tabs / micro: snappy */
    hover: [0.16, 1, 0.3, 1] as const,
    /** Exit / reverse */
    exit: [0.4, 0, 0.2, 1] as const,
};

/* ── Stagger Helper ─────────────────────────── */

export function stagger(index = 0, step = 0.06, start = 0) {
    return start + index * step;
}

/* ── Animation Variants ─────────────────────── */

export function fadeUp(distance = 20) {
    return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
    };
}

export function scaleIn(scale = 0.97) {
    return {
        hidden: { opacity: 0, scale },
        visible: { opacity: 1, scale: 1 },
    };
}

export function softParallax(distance = 14) {
    return {
        hidden: { opacity: 0, y: distance, scale: 0.985 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };
}

export function fadeLeft(distance = 24) {
    return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 },
    };
}

export function hoverLift(y = -6, scale = 1.01) {
    return {
        rest: { y: 0, scale: 1 },
        hover: { y, scale },
    };
}

/* ── Preset Resolver ────────────────────────── */

export function getPresetVariants(preset: MotionPreset, distance: number) {
    switch (preset) {
        case "scale-in":
            return scaleIn();
        case "soft-parallax":
            return softParallax(Math.max(10, distance));
        case "fade-left":
            return fadeLeft(distance);
        default:
            return fadeUp(distance);
    }
}

export function getPresetDuration(preset: MotionPreset) {
    return preset === "soft-parallax" ? motionTiming.section : motionTiming.normal;
}
