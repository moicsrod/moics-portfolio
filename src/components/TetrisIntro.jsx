import React, { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";

const blocks = [
  {
    name: "About",
    color: "#00D2AA",
    width: 134,
    height: 72,
    x: 0,
    y: 162,
  },
  {
    name: "Profile",
    color: "#FF2964",
    width: 65,
    height: 158,
    x: 138,
    y: 76,
  },
  {
    name: "TLDR",
    color: "#540D6E",
    width: 64,
    height: 98,
    x: 207,
    y: 136,
  },
  {
    name: "Work",
    color: "#FFD000",
    width: 134,
    height: 158,
    x: 0,
    y: 0,
  },
  {
    name: "Portrait",
    color: "#540D6E",
    width: 65,
    height: 72,
    x: 138,
    y: 0,
  },
  {
    name: "Experience",
    color: "#0EAD69",
    width: 64,
    height: 132,
    x: 207,
    y: 0,
  },
];

export default function TetrisIntro({ onComplete }) {
  const [scope, animate] = useAnimate();
  const hasFinished = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      for (let i = 0; i < blocks.length; i++) {
        if (isCancelled) return;
        const selector = `[data-intro-block="${i}"]`;

        await animate(
          selector,
          { y: 0, opacity: 1 },
          { duration: 0.45, ease: [0.33, 1, 0.68, 1] }
        );

        if (isCancelled) return;
        await animate(
          selector,
          { y: [0, -5, 0] },
          { duration: 0.1, ease: "easeOut" }
        );
      }

      if (isCancelled) return;

      await animate(
        ".intro-board",
        { scale: [1, 1.12, 0.96, 1] },
        { duration: 0.38, ease: "easeInOut" }
      );

      if (isCancelled) return;

      await animate(
        ".intro-board",
        { scale: 1.35, opacity: 0 },
        { duration: 0.32, ease: [0.4, 0, 0.2, 1] }
      );

      if (!isCancelled && !hasFinished.current) {
        hasFinished.current = true;
        onComplete();
      }
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [animate, onComplete]);

  const handleSkip = () => {
    if (!hasFinished.current) {
      hasFinished.current = true;
      onComplete();
    }
  };

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
      style={{ backgroundColor: "transparent" }}
    >
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 rounded-full border border-[#313131] bg-black/60 text-white text-xs font-semibold backdrop-blur-md cursor-pointer hover:bg-black/80 transition z-50"
      >
        Skip intro
      </button>

      <div
        className="intro-board relative"
        style={{
          width: 271,
          height: 234,
          transformOrigin: "center center",
          backgroundColor: "transparent",
        }}
      >
        {blocks.map((block, index) => (
          <div
            key={block.name}
            data-intro-block={index}
            className="absolute"
            style={{
              left: block.x,
              top: block.y,
              width: block.width,
              height: block.height,
              backgroundColor: block.color,
              borderRadius: 10,
              border: "2px solid #313131",
              transform: "translateY(-900px)",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}