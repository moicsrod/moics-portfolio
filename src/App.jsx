import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BentoGrid from "./components/BentoGrid";
import DisclaimerBanner from "./components/DisclaimerBanner";
import ProjectModal from "./components/ProjectModal";
import TetrisIntro from "./components/TetrisIntro";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [selectedProject, setSelectedProject] = useState("busy");
  const [activeModal, setActiveModal] = useState(null);
  const bannerTimer = useRef(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    bannerTimer.current = window.setTimeout(() => setShowBanner(true), 400);
  }, []);

  const updateActiveSection = (update) => {
    const next = typeof update === "function" ? update(activeSection) : update;
    setActiveSection(next);
    if (next !== "work") setShowBanner(false);
  };

  return (
    <div className="app-shell relative min-h-screen overflow-x-hidden">
      <div className="blueprint-grid" aria-hidden="true" />

      <AnimatePresence>
        {!introComplete && (
          <TetrisIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <motion.main
        className="portfolio-main relative z-10 w-full"
        initial={{ opacity: 0, scale: 0.65 }}
        animate={
          introComplete
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.65 }
        }
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.8,
        }}
      >
        {introComplete && (
          <DisclaimerBanner
            show={showBanner}
            onDismiss={() => setShowBanner(false)}
          />
        )}
        <BentoGrid
          activeSection={activeSection}
          setActiveSection={updateActiveSection}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onOpenProjectModal={setActiveModal}
        />
      </motion.main>

      <AnimatePresence>
        {activeModal && (
          <ProjectModal
            key={activeModal}
            projectId={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

