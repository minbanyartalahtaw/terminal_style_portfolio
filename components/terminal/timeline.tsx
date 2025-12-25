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

  // Handle image click
  const handleImageClick = (src: string) => {
    if (window.innerWidth < 1024) {
      return;
    }
    setSelectedImage(src);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Close on escape key
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

  // Clone data and add click handlers to images
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
      <div className="w-full font-sans" ref={containerRef}>
        {/* Header Section - More Compact */}
        <div className="px-4 py-6 md:py-8 border-b border-neutral-100">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-2xl mb-2 text-white font-bold">
            My Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-neutral-400 text-xs md:text-sm">
            A collection of web development projects from the past year
          </motion.p>
        </div>

        {/* Timeline Content */}
        <div ref={ref} className="relative px-4 pb-8 md:pb-12">
          {enhancedData.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 md:gap-6 pt-6 md:pt-8 first:pt-8">
              {/* Timeline Dot and Line Container */}
              <div className="relative flex flex-col items-center pt-1">
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative z-10 flex-shrink-0">
                  <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-[#dc0075] ring-4 ring-[#300a24]" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-1 pb-6 md:pb-8">
                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
                  {item.title}
                </h3>

                {/* Content */}
                <div className="text-neutral-300 cursor-pointer [&_img]:cursor-pointer [&_img]:transition-transform [&_img]:hover:scale-[1.02]">
                  {item.content}
                </div>
              </motion.div>
            </div>
          ))}

          {/* Animated Vertical Line */}
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
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-[#dc0075] via-[#dc0075] to-transparent rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Close">
              <X size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage}
                alt="Project screenshot"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
