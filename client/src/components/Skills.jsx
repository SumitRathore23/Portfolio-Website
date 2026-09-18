import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer from "./StaggerContainer";
import StaggerItem from "./StaggerItem";

function Skills() {
  const categories = [
    {
      title: "FRONTEND",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React JS",
      ],
    },
    {
      title: "BACKEND",
      skills: [
        "Node JS",
        "Express JS",
        "REST APIs",
      ],
    },
    {
      title: "DATABASE",
      skills: [
        "MongoDB",
        "MySQL",
      ],
    },
    {
      title: "LANGUAGES",
      skills: [
        "JavaScript",
        "C",
        "C++",
        "Python",
      ],
    },
    {
      title: "TOOLS",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Vercel",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="section skills-section"
    >

      <ScrollReveal>
        <p className="section-label">
          02 — SKILLS
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="skills-heading">
          <h2>
            My <span>Toolkit.</span>
          </h2>

          <p>
            Technologies I use to design, build
            and deploy full-stack applications.
          </p>
        </div>
      </ScrollReveal>

      <div className="skills-categories">

        {categories.map((category, categoryIndex) => (

          <ScrollReveal
            key={category.title}
            delay={categoryIndex * 0.08}
            direction={
              categoryIndex % 2 === 0
                ? "left"
                : "right"
            }
          >

            <div className="skill-category">

              <div className="category-header">
                <span>
                  0{categoryIndex + 1}
                </span>

                <h3>
                  {category.title}
                </h3>
              </div>

              <StaggerContainer className="category-skills">

                {category.skills.map(
                  (skill, index) => (

                    <StaggerItem key={skill}>

                      <motion.div
                        className="advanced-skill"
                        whileHover={{
                          x: 8,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >

                        <span className="skill-index">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <span className="advanced-skill-name">
                          {skill}
                        </span>

                        <span className="skill-arrow">
                          ↗
                        </span>

                      </motion.div>

                    </StaggerItem>

                  )
                )}

              </StaggerContainer>

            </div>

          </ScrollReveal>

        ))}

      </div>

    </section>
  );
}

export default Skills;