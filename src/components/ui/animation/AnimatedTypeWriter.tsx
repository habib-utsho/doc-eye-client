import { motion } from "framer-motion";

const AnimatedTypeWriter = ({ text, className }: { text: string; className?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // speed of typing
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="font-semibold text-primary"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTypeWriter;
