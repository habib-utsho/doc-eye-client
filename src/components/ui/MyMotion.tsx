"use client";
import React from "react";
import { motion } from "framer-motion";

interface TProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  className?: string;
}

const MyMotion = ({ children, delay, x, y, scale, className }: TProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: x || 0, y: y || 0, scale: scale || 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: delay || 0.2, type: "spring", stiffness: 70 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MyMotion;
