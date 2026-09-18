import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section"
    >

      <ScrollReveal>
        <p className="section-label">
          03 — EXPERIENCE
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2>Experience.</h2>
      </ScrollReveal>

      <div className="experience-timeline">

        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />

        <ScrollReveal delay={0.2}>

          <div className="experience-card">

            <div className="experience-date">
              2025
            </div>

            <div className="experience-dot"></div>

            <h3>
              Full Stack Developer Intern
            </h3>

            <h4>
              Civora Nexus
            </h4>

            <p>
              Built dynamic forms, automated
              document creation workflows and
              integrated backend APIs for proposal
              customization.
            </p>

            <p>
              Developed reusable templates and
              dynamic content modules that helped
              automate 80% of the manual
              proposal-writing process.
            </p>

            <div className="experience-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>REST APIs</span>
              <span>Automation</span>
            </div>

          </div>

        </ScrollReveal>

      </div>

    </section>
  );
}

export default Experience;