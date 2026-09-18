import { useState } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const techStack = [
    {
      name: "REACT",
      className: "tech-react",
    },
    {
      name: "NODE.JS",
      className: "tech-node",
    },
    {
      name: "EXPRESS",
      className: "tech-express",
    },
    {
      name: "REST API",
      className: "tech-api",
    },
    {
      name: "MONGODB",
      className: "tech-mongo",
    },
  ];

  return (
    <section
      className="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div className="hero-grid"></div>

      {/* Mouse Glow */}
      <div
        className="mouse-glow"
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
      ></div>

      {/* Ambient Glow */}
      <div className="hero-glow"></div>

      {/* Floating Technologies */}
      <div className="floating-tech">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className={`tech-orb ${tech.className}`}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-content"
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.p
          className="hero-small"
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
        >
          HELLO, I'M
        </motion.p>

        <div className="hero-title-wrapper">
          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.8,
              letterSpacing: "-2px",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              letterSpacing: "-10px",
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            SUMIT
            <span>.</span>
          </motion.h1>

          <div className="hero-title-outline">
            FULL STACK
          </div>
        </div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 0.8,
          }}
        >
          FULL STACK DEVELOPER
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.9,
            duration: 0.8,
          }}
        >
          I build modern, responsive and scalable
          web applications using React, Node.js,
          Express and REST APIs.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.1,
            duration: 0.8,
          }}
        >
          <a href="#projects">
            <span>VIEW PROJECTS</span>
            <span className="button-arrow">↗</span>
          </a>

          <a href="#contact">
            <span>CONTACT ME</span>
            <span className="button-arrow">↗</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero-scroll"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
        }}
      >
        <span>SCROLL</span>

        <div></div>
      </motion.div>

      {/* Hero Coordinates */}
      <div className="hero-coordinates">
        <span>28°40'N</span>
        <span>77°25'E</span>
      </div>
    </section>
  );
}

export default Hero;