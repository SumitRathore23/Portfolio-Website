import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, .skill-card, .project-card"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      <motion.div
        className="cursor-ring"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovering ? 1.7 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      />
    </>
  );
}

export default CustomCursor;