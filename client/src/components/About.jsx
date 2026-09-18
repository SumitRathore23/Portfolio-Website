import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function About() {
  return (
    <section id="about" className="section about-section">

      <ScrollReveal>
        <p className="section-label">
          01 — ABOUT
        </p>
      </ScrollReveal>

      <div className="about-layout">

        <ScrollReveal
          className="about-heading"
          direction="left"
        >
          <h2>
            I turn ideas
            <br />
            into <span>digital</span>
            <br />
            experiences.
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="about-content"
          direction="right"
          delay={0.15}
        >
          <p className="about-intro">
            I'm Sumit, a Full Stack Developer focused
            on building modern, responsive and
            user-focused web applications.
          </p>

          <p>
            I work across the frontend and backend,
            using React JS, Node JS, Express JS,
            REST APIs and databases to turn ideas
            into functional software.
          </p>

          <p>
            I enjoy solving problems, learning new
            technologies and creating experiences
            that are both visually engaging and
            technically solid.
          </p>
        </ScrollReveal>

      </div>

      <motion.div
        className="about-marquee"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
      >
        <div className="marquee-track">
          <span>FULL STACK DEVELOPER</span>
          <span>✦</span>
          <span>REACT</span>
          <span>✦</span>
          <span>NODE.JS</span>
          <span>✦</span>
          <span>REST APIs</span>
          <span>✦</span>

          <span>FULL STACK DEVELOPER</span>
          <span>✦</span>
          <span>REACT</span>
          <span>✦</span>
          <span>NODE.JS</span>
          <span>✦</span>
          <span>REST APIs</span>
          <span>✦</span>
        </div>
      </motion.div>

    </section>
  );
}

export default About;