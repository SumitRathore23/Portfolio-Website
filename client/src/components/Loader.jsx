import { motion } from "framer-motion";

function Loader({ onComplete }) {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
    >
      <div className="loader-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          WELCOME
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
        >
          SUMIT<span>.</span>
        </motion.h1>

        <motion.div
          className="loader-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
          }}
        />
      </div>
    </motion.div>
  );
}

export default Loader;