import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "../constants/assets";

export default function ProjectModal({ projectId, onClose }) {
  const project = PROJECTS_DATA[projectId];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
                {project.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <a
              className="project-modal-visit"
              href="https://busymoics.figma.site/"
              target="_blank"
              rel="noreferrer"
            >
              Visit site
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
            </div>
          </section>
        </div>
      </motion.section>
    </motion.div>
  );
}
