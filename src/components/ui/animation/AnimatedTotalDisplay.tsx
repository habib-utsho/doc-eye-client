import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedTotalDisplay({ total }: { total: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, total, {
      duration: 2.2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [total, count]);

  return (
    <motion.span className="ml-1 text-lg font-bold text-primary">
      {rounded}
    </motion.span>
  );
}
