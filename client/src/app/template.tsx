'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { duration, easing } from '@/lib/motion-tokens';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.base,
        ease: easing.reveal,
      }}
    >
      {children}
    </motion.div>
  );
}
