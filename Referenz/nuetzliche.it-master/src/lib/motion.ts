export const motionTiming = {
  fast: 0.18,
  normal: 0.26,
  slow: 0.34,
  section: 0.42
} as const;

export const motionEasing = [0.22, 1, 0.36, 1] as const;

export function stagger(index = 0, step = 0.05, start = 0) {
  return start + index * step;
}

export function fadeUp(distance = 20) {
  return {
    hidden: {opacity: 0, y: distance},
    visible: {opacity: 1, y: 0}
  };
}

export function scaleIn(scale = 0.97) {
  return {
    hidden: {opacity: 0, scale},
    visible: {opacity: 1, scale: 1}
  };
}

export function softParallax(distance = 14) {
  return {
    hidden: {opacity: 0, y: distance, scale: 0.985},
    visible: {opacity: 1, y: 0, scale: 1}
  };
}

export function hoverLift(y = -6, scale = 1.01) {
  return {
    rest: {y: 0, scale: 1},
    hover: {y, scale}
  };
}
