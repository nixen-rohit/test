"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// Types & Data
interface SlideItem {
  id: number;
  image: string;
  author: string;
  title: string;
  description: string;
  CustomBg?: React.ReactNode;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    image: "/Img/badminton-court.jpg",
    author: "Smash2Play",
    title: "Badminton Courts",
    description: "Premium indoor courts with professional flooring",
  },
  {
    id: 2,
    image: "/Img/football-turf.jpg",
    author: "Smash2Play",
    title: " Football Turf",

    description: "High-quality artificial turf for matches & training",
  },
  {
    id: 3,
    image: "/Img/cricket-turf.jpg",
    author: "Smash2Play",
    title: " Box Cricket",
    description: "Fast-paced, fun cricket experience",
  },
  {
    id: 4,
    image: "/Img/pickleball-turf.jpg",
    author: "Smash2Play",
    title: "Pickleball",

    description: "Fast-growing sport with dedicated courts",
  },
];

const CONFIG = {
  TRANSITION_MS: 800,
  THUMB_WIDTH: 150,
  THUMB_HEIGHT: 220,
  THUMB_BOTTOM: 50,
  THUMB_LEFT: "calc(50% + 16px)",
};

export default function Carousel() {
  const [items, setItems] = useState<SlideItem[]>(SLIDES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const moveNext = useCallback(() => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);

    setTimeout(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setIsAnimating(false);
      setDirection(null);
    }, CONFIG.TRANSITION_MS);
  }, [isAnimating]);

  const movePrev = useCallback(() => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);

    setTimeout(() => {
      setItems((prev) => {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, -1);
        return [last, ...rest];
      });
      setIsAnimating(false);
      setDirection(null);
    }, CONFIG.TRANSITION_MS);
  }, [isAnimating]);

  const activeSlide = items[0];
  const nextSlide = items[1];
  const lastSlide = items[items.length - 1];

  return (
    <div
      id="sports"
      className="relative h-screen w-full overflow-hidden bg-black text-white font-sans"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#050B0A] via-transparent to-transparent z-15" />

      <div className="absolute inset-0 bg-linear-to-t from-[#050B0A] via-transparent to-transparent z-15" />

      {/* Header */}

      <h2 className="absolute left-10 top-30 md:left-20 lg:left-30 md:top-10 z-100 text-white text-4xl md:text-5xl font-bold leading-tight max-w-xl">
        Everything You Need —{" "}
        <span className="text-(--highlight)">In One Place</span>
      </h2>

      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {direction === "prev" ? (
          <Image
            width={500}
            height={500}
            src={lastSlide.image}
            className="w-full h-full object-cover opacity-80"
            alt="incoming-prev"
          />
        ) : (
          <div className="w-full h-full">
            {!isAnimating && activeSlide.CustomBg ? (
              activeSlide.CustomBg
            ) : (
              <Image
                width={500}
                height={500}
                src={activeSlide.image}
                className="w-full h-full object-cover opacity-80"
                alt="current"
              />
            )}
          </div>
        )}
      </div>

      {/* 2. TRANSITION LAYER (Expander / Shrinker) */}
      <AnimatePresence>
        {isAnimating && direction === "next" && (
          <motion.div
            key="expanding-card"
            className="absolute z-50 overflow-hidden "
            initial={{
              width: CONFIG.THUMB_WIDTH,
              height: CONFIG.THUMB_HEIGHT,
              bottom: CONFIG.THUMB_BOTTOM,
              left: CONFIG.THUMB_LEFT,
              borderRadius: 24,
            }}
            animate={{
              width: "100%",
              height: "100%",
              bottom: 0,
              left: 0,
              filter: "brightness(0.5)",
              borderRadius: 0,
            }}
            transition={{
              duration: CONFIG.TRANSITION_MS / 1000,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
              width={500}
              height={500}
              src={nextSlide.image}
              alt="slider image"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {isAnimating && direction === "prev" && (
          <motion.div
            key="shrinking-card"
            className="absolute z-50 overflow-hidden"
            initial={{
              width: "100%",
              height: "100%",
              bottom: 0,
              left: 0,
              borderRadius: 0,
            }}
            animate={{
              width: CONFIG.THUMB_WIDTH,
              height: CONFIG.THUMB_HEIGHT,
              bottom: CONFIG.THUMB_BOTTOM,
              left: CONFIG.THUMB_LEFT,
              borderRadius: 24,
            }}
            transition={{
              duration: CONFIG.TRANSITION_MS / 1000,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
            alt="slider image"
              width={500}
              height={500}
              src={activeSlide.image}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT */}
      <div className="absolute inset-0 z-30 flex items-center px-[10%] pointer-events-none">
        <AnimatePresence mode="wait">
          {!isAnimating && (
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <span className="font-bold tracking-[10px] text-(--highlight) uppercase">
                {activeSlide.author}
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                {activeSlide.title}
              </h1>
              <p className="text-(--dark-text) text-lg leading-relaxed">
                {activeSlide.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. THUMBNAILS */}
      <div className="absolute bottom-12 left-1/2 z-80 flex gap-4 ">
        {/* Placeholder for the shrinking card so the tray doesn't snap left */}
        {isAnimating && direction === "prev" && (
          <div
            style={{ width: CONFIG.THUMB_WIDTH, height: CONFIG.THUMB_HEIGHT }}
            className="shrink-0"
          />
        )}

        <AnimatePresence mode="popLayout">
          {items.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity:
                  index === 0 && isAnimating && direction === "next" ? 0 : 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ width: CONFIG.THUMB_WIDTH, height: CONFIG.THUMB_HEIGHT }}
              className="relative shrink-0 overflow-hidden rounded-3xl cursor-pointer"
              onClick={moveNext}
            >
              <Image
                width={500}
                height={500}
                src={item.image}
                alt="slider image"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. CONTROLS (Separated from Tray) */}
      <div className="absolute bottom-10 left-[10%] z-100 flex gap-4">
        <button
          onClick={movePrev}
          disabled={isAnimating}
          className="px-6 py-2 border border-white/50 rounded-full hover:bg-white hover:text-black transition-colors disabled:opacity-30"
        >
          PREV
        </button>
        <button
          onClick={moveNext}
          disabled={isAnimating}
          className="px-6 py-2 border border-white/50 rounded-full hover:bg-white hover:text-black transition-colors disabled:opacity-30"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}