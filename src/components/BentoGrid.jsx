import React from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const descriptionStyle = {
  fontSize: "20px",
  lineHeight: "1.35",
  fontWeight: 400,
  fontFamily: "Poppins, sans-serif",
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
        <p style={descriptionStyle}>{PROJECTS_DATA.overview}</p>
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
      <p
        className={`about-copy ${expanded ? "about-copy-expanded" : ""}`}
        style={descriptionStyle}
      >
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
            <p className="about-hobbies-copy" style={descriptionStyle}>
              {ABOUT_DATA.hobbies}
            </p>
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
        <div className="experience-collapsed-content">
          <div className="experience-collapsed-top">
            <div className="experience-summary">
              <p style={descriptionStyle} className="m-0 text-black">
                Designing for <b>Humans</b> at Humano Seguros — UI/UX Designer
              </p>
            </div>
            <div className="experience-brand experience-brand-compact">
              <div className="experience-brand-copy">
                <strong>UI UX Design</strong>
                <span>DR</span>
              </div>
              <div className="experience-brand-logo">
                <img src={ASSETS.humanoLogo} alt="Humano Seguros" />
              </div>
            </div>
          </div>
          <div className="experience-collapsed-bottom">
            <div className="experience-stat">
              <div className="experience-stat-copy">
                <span className="experience-stat-value">20+</span>
                <span className="experience-stat-label">Features Shipped</span>
              </div>
              <span className="experience-stat-badge">Production</span>
            </div>
            <div className="experience-summary-footer">
              <span>2024 — Present</span>
              <span>Click to expand ↗</span>
            </div>
          </div>
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
              <p key={item.title} style={descriptionStyle}>
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
      className="portfolio-card profile-card relative flex h-full min-h-[640px] w-full select-none flex-col justify-between overflow-hidden rounded-[32px] border-2 border-[#313131] p-[24px_40px]"
      style={{ backgroundColor: "#FF2964", boxSizing: "border-box" }}
    >
      <div className="flex w-full flex-col items-start gap-5">
        <h1
          className="design-title w-full select-none text-white"
          style={{
            fontSize: "38px",
            lineHeight: "67px",
            height: "auto",
            margin: 0,
            padding: 0,
          }}
        >
          MOISES<br />
          RODRI<br />
          GUEZ
        </h1>
        <p
          className="m-0 text-white"
          style={descriptionStyle}
        >
          UI/UX Designer with a deep focus on design systems &amp; human-centered
          interfaces
        </p>
        <div className="flex items-center gap-4 pt-1">
          <a
            href="https://www.linkedin.com/in/mois%C3%A9s-ram%C3%B3n-rodr%C3%ADguez-s%C3%A1nchez/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <g clipPath="url(#clip0_384_2613)">
                <path
                  d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031V40.9031Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_384_2613">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            href="mailto:moiserod04@gmail.com"
            aria-label="Send email"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M44 12C44 9.8 42.2 8 40 8H8C5.8 8 4 9.8 4 12M44 12V36C44 38.2 42.2 40 40 40H8C5.8 40 4 38.2 4 36V12M44 12L24 26L4 12"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-auto w-full pt-6">
        <button
          type="button"
          onClick={onOpenContactModal}
          className="cursor-pointer text-white transition hover:brightness-110 active:scale-95"
          style={{
            display: "flex",
            width: "185px",
            height: "56px",
            padding: "16px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            borderRadius: "16px",
            backgroundColor: "#540D6E",
            border: "none",
            fontWeight: 600,
          }}
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
      <p style={descriptionStyle}>
        Great designer, great guy, hit me up to build something cool :)
      </p>
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
              <p className="work-summary" style={descriptionStyle}>
                {project.description}
              </p>
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
              <p className="experience-work-copy" style={descriptionStyle}>
                {PROJECTS_DATA.overview}
              </p>
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
