import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROJECT_IDS, PROJECTS_DATA } from "../constants/assets";

export default function ProjectModal({ projectId, onClose }) {
  const [activeProjectId, setActiveProjectId] = useState(projectId);
  const project = PROJECTS_DATA[activeProjectId];

  const navigateProject = useCallback((direction) => {
    setActiveProjectId((currentProjectId) => {
      const currentIndex = PROJECT_IDS.indexOf(currentProjectId);
      const nextIndex =
        (currentIndex + direction + PROJECT_IDS.length) % PROJECT_IDS.length;
      return PROJECT_IDS[nextIndex];
    });
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateProject(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateProject(1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigateProject, onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <motion.section
        className="project-modal"
        style={{
          "--modal-color": project.modalColor,
          "--about-color": project.aboutColor,
          "--preview-color": project.previewColor,
          "--preview-heading-color": project.previewHeadingColor,
        }}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          className="project-modal-nav project-modal-nav-previous"
          type="button"
          aria-label="Previous project"
          onClick={() => navigateProject(-1)}
        >
          ‹
        </button>
        <button
          className="project-modal-nav project-modal-nav-next"
          type="button"
          aria-label="Next project"
          onClick={() => navigateProject(1)}
        >
          ›
        </button>
        <header className="project-modal-header">
          <img className="project-modal-brand" src={project.image} alt="" />
          <div className="project-modal-heading">
            <h2
              id="project-modal-title"
              className="design-title font-['Boldonse',sans-serif]"
            >
              {project.title}
            </h2>
            <p>{project.tagline}</p>
          </div>
          <button
            className="project-modal-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="project-modal-columns">
          <section className="project-modal-about">
            <div>
              <h3 className="design-title font-['Boldonse',sans-serif]">ABOUT</h3>
              <div className="project-modal-copy">
                <p>{project.description}</p>
              </div>
            </div>
            <a
              className="project-modal-visit"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.actionLabel}
            </a>
          </section>

          <section className="project-modal-preview">
            <h3 className="design-title font-['Boldonse',sans-serif]">PREVIEW</h3>
            <div className="project-modal-images">
              {project.previews.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} preview ${index + 1}`}
                />
              ))}
              {project.previews.length === 0 && (
                <div className="project-modal-placeholder" role="status">
                  {project.previewPlaceholder}
                </div>
              )}
            </div>
          </section>
        </div>
      </motion.section>
    </motion.div>
  );
}
