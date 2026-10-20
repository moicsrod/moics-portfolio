import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DisclaimerBanner({ show, onDismiss }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          className="notice-banner"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          role="status"
        >
          <p>Click on the About and Experience cards to expand.</p>
          <button
            className="notice-dismiss"
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            ✕
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
