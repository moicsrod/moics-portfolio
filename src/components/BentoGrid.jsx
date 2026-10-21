import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import {
  ASSETS,
  ABOUT_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  PROJECT_IDS,
} from "../constants/assets";

const layoutTransition = {
  type: "spring",
  stiffness: 280,
  damping: 30,
};

function ProjectCollage({ project }) {
  return (
    <div className="project-collage" aria-label={`${project.title} project preview`}>
      <div className="project-collage-main">
        <img src={project.image} alt="" />
        <span className="project-collage-title design-title font-['Boldonse',sans-serif]">
          {project.title}
        </span>
      </div>
      <div className="project-collage-side" aria-hidden="true">
        {project.otherImages.map((image) => (
          <img src={image} key={image} alt="" />
        ))}
      </div>
    </div>
  );
}

function ProjectButtons({ projectId, onOpenProjectModal, onNextProject }) {
  return (
    <div className="project-buttons">
      <button
        className="project-button project-button-primary"
        onClick={() => onOpenProjectModal(projectId)}
        type="button"
      >
        Know more
      </button>
      <button
        className="project-button project-button-secondary"
        onClick={onNextProject}
        type="button"
      >
        Explore projects
      </button>
    </div>
  );
}

function ProjectOverview({ project, projectId, onOpenProjectModal, onNextProject }) {
  return (
    <>
      <div className="project-overview">
        <img src={project.image} alt="" />
        <p>{PROJECTS_DATA.overview}</p>
      </div>
      <ProjectButtons
        projectId={projectId}
        onOpenProjectModal={onOpenProjectModal}
        onNextProject={onNextProject}
      />
    </>
  );
}

function AboutCard({ expanded, onToggle }) {
  return (
    <motion.article
      layout
      transition={layoutTransition}
      className={`portfolio-card about-card ${expanded ? "about-card-expanded" : ""}`}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <h2 className="design-title font-['Boldonse',sans-serif]">ABOUT</h2>
      <p className={`about-copy ${expanded ? "about-copy-expanded" : ""}`}>
        {expanded ? ABOUT_DATA.expandedBio : ABOUT_DATA.fullBio}
      </p>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="about-hobbies"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="about-hobbies-copy">{ABOUT_DATA.hobbies}</p>
            <div className="about-gallery">
              {ABOUT_DATA.gallery.map(({ image, label }) => (
                <div className="about-hobby" key={label}>
                  <img src={image} alt="" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ExperienceCard({ expanded, onToggle }) {
  return (
    <motion.article
      layout
      transition={layoutTransition}
      className={`portfolio-card experience-card ${expanded ? "experience-card-expanded" : ""}`}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <h2 className="design-title font-['Boldonse',sans-serif]">EXPERIENCE</h2>
      {!expanded ? (
        <div className="experience-summary">
          <p>Designing for Humans</p>
          <p className="experience-company">Humano Seguros</p>
          <p>DR - UI UX Designer</p>
        </div>
      ) : (
        <motion.div
          className="experience-details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          <div className="experience-brand">
            <div className="experience-brand-copy">
              <strong>UI UX Design</strong>
              <span>DR</span>
            </div>
            <div className="experience-brand-logo">
              <img src={ASSETS.humanoLogo} alt="Humano Seguros" />
            </div>
          </div>
          <div className="experience-timeline">
            <span>2024</span>
            <span className="experience-timeline-line" />
            <span>present</span>
          </div>
          <div className="experience-achievements">
            {EXPERIENCE_DATA.achievements.map((item) => (
              <p key={item.title}>
                <strong>{item.title}</strong>
                <br />
                {item.description}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

function ProfilePhoto() {
  return (
    <motion.div
      layout
      transition={layoutTransition}
      className="profile-photo"
    >
      <img src={ASSETS.moises} alt="Moises Rodriguez" />
      <span className="profile-accent" aria-hidden="true" />
    </motion.div>
  );
}

function ProfileCard({ onOpenContactModal }) {
  return (
    <motion.article
      layout
      transition={layoutTransition}
      className="portfolio-card profile-card"
    >
      <div className="profile-card-content">
        <h1 className="design-title font-['Boldonse',sans-serif]">
          <span>MOISES</span>
          <span>RODRIGUEZ</span>
        </h1>
        <p>
          UI/UX Designer with a deep focus on design systems &amp; human-centered
          interfaces
        </p>
        <div className="profile-card-actions" aria-label="Contact links">
          <a
            href="https://www.linkedin.com/in/mois%C3%A9s-ram%C3%B3n-rodr%C3%ADguez-s%C3%A1nchez/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <path d="M8 10v7M8 7.5v.01M12 17v-7h2.5a2.5 2.5 0 0 1 2.5 2.5V17" />
            </svg>
          </a>
          <a href="mailto:moiserod04@gmail.com" aria-label="Email Moises">
            <Mail aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="profile-card-bottom">
        <button
          className="profile-contact-button"
          type="button"
          onClick={onOpenContactModal}
        >
          Contact me
        </button>
      </div>
    </motion.article>
  );
}

function TldrCard() {
  return (
    <motion.article
      layout
      transition={layoutTransition}
      className="portfolio-card tldr-card"
    >
      <h2 className="design-title font-['Boldonse',sans-serif]">TLDR</h2>
      <p>Great designer, great guy, hit me up to build something cool :)</p>
    </motion.article>
  );
}

export default function BentoGrid({
  activeSection,
  setActiveSection,
  selectedProject,
  setSelectedProject,
  onOpenProjectModal,
  onOpenContactModal,
}) {
  const project = PROJECTS_DATA[selectedProject];
  const nextProject = () => {
    const currentIndex = PROJECT_IDS.indexOf(selectedProject);
    setSelectedProject(
      PROJECT_IDS[(currentIndex + 1) % PROJECT_IDS.length],
    );
  };

  const toggleSection = (section) => {
    setActiveSection((current) => (current === section ? "work" : section));
  };

  return (
    <motion.section
      layout
      transition={layoutTransition}
      className={`bento-grid bento-grid-${activeSection}`}
      aria-label="Portfolio"
    >
      <motion.div layout className="portfolio-column primary-column">
        <motion.article
          layout
          transition={layoutTransition}
          className={`portfolio-card work-card work-card-${activeSection}`}
        >
          <h2 className="design-title font-['Boldonse',sans-serif]">WORK</h2>
          {activeSection === "work" ? (
            <>
              <ProjectCollage project={project} />
              <p className="work-summary">{project.description}</p>
              <ProjectButtons
                projectId={selectedProject}
                onOpenProjectModal={onOpenProjectModal}
                onNextProject={nextProject}
              />
            </>
          ) : activeSection === "about" ? (
            <ProjectOverview
              project={project}
              projectId={selectedProject}
              onOpenProjectModal={onOpenProjectModal}
              onNextProject={nextProject}
            />
          ) : (
            <>
              <p className="experience-work-copy">{PROJECTS_DATA.overview}</p>
              <img className="experience-work-image" src={project.image} alt="" />
            </>
          )}
        </motion.article>
        <AboutCard
          expanded={activeSection === "about"}
          onToggle={() => toggleSection("about")}
        />
      </motion.div>

      <motion.div layout className="portfolio-column profile-column">
        <ProfilePhoto />
        <ProfileCard onOpenContactModal={onOpenContactModal} />
      </motion.div>

      <motion.div layout className="portfolio-column secondary-column">
        <ExperienceCard
          expanded={activeSection === "experience"}
          onToggle={() => toggleSection("experience")}
        />
        <TldrCard />
      </motion.div>
    </motion.section>
  );
}
