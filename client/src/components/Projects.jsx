import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    number: "01",
    title: "GymPilot AI",
    category: "FULL STACK APPLICATION",
    description:
      "A full-stack gym management platform designed to manage members, subscriptions, attendance, workouts, diets, payments and billing from a centralized dashboard.",
    technologies: [
      "React JS",
      "Node JS",
      "Express JS",
      "MongoDB",
      "REST APIs",
    ],
    link: "https://gym-management-system-flame-two.vercel.app/",
    type: "featured",
  },
  {
    number: "02",
    title: "Personal Portfolio",
    category: "FRONTEND APPLICATION",
    description:
      "A responsive portfolio website designed to showcase projects, technical skills and professional experience with a mobile-first approach.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    link: "#",
    type: "secondary",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="section projects-section"
    >
      <ScrollReveal>
        <p className="section-label">
          04 — PROJECTS
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="projects-heading">
          <h2>
            Things I've
            <br />
            <span>built.</span>
          </h2>

          <p>
            A selection of projects where design,
            frontend development and backend
            engineering come together.
          </p>
        </div>
      </ScrollReveal>

      <div className="projects-list">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.number}
            delay={index * 0.15}
          >
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article
      className={`project-showcase ${project.type}`}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <div className="project-background-grid"></div>

      <div className="project-top">
        <span className="project-number">
          {project.number}
        </span>

        <span className="project-category">
          {project.category}
        </span>
      </div>

      <div className="project-main">
        <div className="project-info">
          <motion.h3
            whileHover={{
              x: 8,
            }}
          >
            {project.title}
            <span>.</span>
          </motion.h3>

          <p className="project-description">
            {project.description}
          </p>

          <div className="project-technologies">
            {project.technologies.map((tech) => (
              <span key={tech}>
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target={
              project.link.startsWith("#")
                ? undefined
                : "_blank"
            }
            rel={
              project.link.startsWith("#")
                ? undefined
                : "noreferrer"
            }
            className="project-action"
          >
            <span>VIEW PROJECT</span>
            <span className="project-action-arrow">
              ↗
            </span>
          </a>
        </div>

        <div className="project-visual">
          <div className="visual-window">

            <div className="window-header">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="window-address">
                GYMPILOT / DASHBOARD
              </div>
            </div>

            <div className="dashboard-preview">

              <div className="preview-sidebar">
                <div className="preview-logo">
                  GP
                </div>

                <div className="preview-menu active">
                  Overview
                </div>

                <div className="preview-menu">
                  Members
                </div>

                <div className="preview-menu">
                  Plans
                </div>

                <div className="preview-menu">
                  Attendance
                </div>

                <div className="preview-menu">
                  Payments
                </div>
              </div>

              <div className="preview-content">

                <div className="preview-title">
                  Dashboard
                </div>

                <div className="preview-stats">

                  <div className="preview-stat">
                    <small>
                      MEMBERS
                    </small>

                    <strong>248</strong>
                  </div>

                  <div className="preview-stat">
                    <small>
                      ACTIVE PLANS
                    </small>

                    <strong>126</strong>
                  </div>

                  <div className="preview-stat">
                    <small>
                      ATTENDANCE
                    </small>

                    <strong>89%</strong>
                  </div>

                </div>

                <div className="preview-chart">
                  <div className="chart-line">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="visual-glow"></div>
        </div>
      </div>

      <div className="project-index">
        PROJECT / {project.number}
      </div>
    </motion.article>
  );
}

export default Projects;