import { motion } from "framer-motion";

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const directions = {
    up: { y: 70, x: 0 },
    down: { y: -70, x: 0 },
    left: { y: 0, x: -70 },
    right: { y: 0, x: 70 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;