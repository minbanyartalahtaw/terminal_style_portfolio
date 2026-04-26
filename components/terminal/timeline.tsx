"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <div className="w-full min-h-screen bg-[rgba(6,10,15,0.56)] rounded-lg border border-white/10">
        <div className="px-6 py-8 md:px-12 md:py-12 border-b border-white/10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            <h2 className="text-2xl md:text-3xl mb-3 text-white font-semibold tracking-tight">
              My Projects
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-3xl">
              A collection of web development projects from the past year
            </p>
          </motion.div>
        </div>

        <div className="px-6 md:px-12 pb-12 md:pb-16">
          {enhancedData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 md:gap-8 py-8 md:py-10 border-b border-white/10 last:border-b-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.25, delay: index * 0.02, ease: "easeOut" }}
                className="text-xs md:text-sm text-neutral-400 tracking-wider uppercase">
                Project {String(index + 1).padStart(2, "0")}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}>
                <h3 className="text-lg md:text-xl font-medium text-white mb-4">
                  {item.title}
                </h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-neutral-200 leading-relaxed cursor-pointer [&_p]:text-sm [&_p]:md:text-base [&_a]:underline-offset-4 [&_a]:hover:underline [&_img]:cursor-pointer [&_img]:rounded-md [&_img]:transition-all [&_img]:duration-200 [&_img]:hover:opacity-95">
                    {item.content}
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeModal}>
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              whileHover={{ opacity: 0.8 }}
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 transition-colors text-white"
              aria-label="Close">
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
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
