"use client";
import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const enhancedData = data.map((item) => ({
    ...item,
    content: (
      <div
        onClick={(e: React.MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "IMG") {
            const img = target as HTMLImageElement;
            handleImageClick(img.src);
          }
        }}>
        {item.content}
      </div>
    ),
  }));

  return (
    <>
      <div className="w-full font-sans min-h-screen" ref={containerRef}>
        {/* Header Section with Stagger Animation */}
        <div className="px-4 py-6 md:py-8 border-b border-neutral-100">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <h2 className="text-xl md:text-2xl mb-2 text-white font-bold">
              My Projects
            </h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="text-neutral-400 text-xs md:text-sm">
              A collection of web development projects from the past year
            </motion.p>
          </motion.div>
        </div>

        {/* Timeline Content with Enhanced Animations */}
        <div ref={ref} className="relative px-4 pb-8 md:pb-12">
          {enhancedData.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 md:gap-6 pt-6 md:pt-8 first:pt-8">
              {/* Timeline Dot with Pulse Effect */}
              <div className="relative flex flex-col items-center pt-1">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
                  }}
                  className="relative z-10 flex-shrink-0">
                  <motion.div
                    className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-[#dc0075] ring-4 ring-[#300a24]"
                    whileHover={{
                      scale: 1.3,
                      boxShadow: "0 0 20px rgba(220, 0, 117, 0.6)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Pulsing ring effect */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15 + 0.6,
                    }}
                    className="absolute inset-0 rounded-full border-2 border-[#dc0075]"
                  />
                </motion.div>
              </div>

              {/* Content with Slide & Fade */}
              <motion.div
                initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-1 pb-6 md:pb-8">
                {/* Title with Gradient Reveal */}
                <motion.h3
                  initial={{ backgroundPosition: "200% center" }}
                  whileInView={{ backgroundPosition: "0% center" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.15 + 0.2,
                    ease: "easeOut",
                  }}
                  className="text-base md:text-lg font-semibold mb-3 md:mb-4"
                  style={{ backgroundSize: "200% 100%" }}>
                  {item.title}
                </motion.h3>

                {/* Content with Stagger Children */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: index * 0.15 + 0.3,
                      },
                    },
                  }}
                  className="text-neutral-300 cursor-pointer [&_img]:cursor-pointer [&_img]:transition-all [&_img]:duration-500 [&_img]:hover:scale-[1.05] [&_img]:hover:brightness-110">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}>
                    {item.content}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          ))}

          {/* Animated Vertical Line with Glow */}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-[1.375rem] md:left-[1.5rem] top-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-100 to-transparent">
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-[#dc0075] via-[#dc0075] to-transparent rounded-full shadow-[0_0_10px_rgba(220,0,117,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Image Modal with Enhanced Animations */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}>
            {/* Close Button with Hover Effect */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{
                scale: 1.1,
                rotate: 90,
                backgroundColor: "rgba(220, 0, 117, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close">
              <X size={24} />
            </motion.button>

            {/* Image Container with Spring Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100, rotateX: -20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{ scale: 0.5, opacity: 0, y: 100, rotateX: 20 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative max-w-7xl max-h-[90vh] w-full perspective-1000"
              onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ filter: "brightness(0.5) blur(20px)" }}
                animate={{ filter: "brightness(1) blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src={selectedImage}
                alt="Project screenshot"
                className="w-full h-full object-contain rounded-lg shadow-2xl shadow-[#dc0075]/20"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
