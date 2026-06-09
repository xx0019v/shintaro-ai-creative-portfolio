// Single luxurious deceleration curve used everywhere — slow, no bounce.
export const easeLuxe = [0.19, 1, 0.22, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: easeLuxe } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.4, ease: easeLuxe } },
};
