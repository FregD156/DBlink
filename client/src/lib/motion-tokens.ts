export const easing = {
  premium: [0.76, 0, 0.24, 1] as [number, number, number, number],    // easeInOutQuart - dùng cho splash, page transition
  reveal: [0.22, 1, 0.36, 1] as [number, number, number, number],     // easeOutExpo - dùng cho scroll-reveal, cảm giác "đáp nhẹ"
  hover: [0.4, 0, 0.2, 1] as [number, number, number, number],        // dùng cho micro-interaction nhanh
};

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  splash: 1.2
};

export const stagger = {
  tight: 0.05,
  normal: 0.08,
  loose: 0.12
};
