import { motion } from "motion/react";
import Image from "next/image";

export default function Skills() {
  const programming_languages = [
    { name: "JavaScript", icon: "javascript-r.svg" },
    { name: "TypeScript", icon: "typescript.svg" },
    { name: "Python", icon: "python-5.svg" },
    { name: "Java", icon: "java-14.svg" },
    { name: "Rust", icon: "rust.svg" },
  ];

  const frontend = [
    { name: "React", icon: "react-2.svg" },
    { name: "Tailwind", icon: "tailwindcss.svg" },
    { name: "MUI", icon: "mui.png" },
    { name: "Next.js", icon: "nextjs.png" },
  ];

  const backend = [
    { name: "Node.js", icon: "nodejs-icon.svg" },
    { name: "Express", icon: "express.jpg" },
  ];

  const databases = [
    { name: "MongoDB", icon: "mongodb.svg" },
    { name: "PostgreSQL", icon: "postgresql.svg" },
    { name: "Firebase", icon: "firebase.svg" },
    { name: "Supabase", icon: "supabase.png" },
  ];

  const tools = [
    { name: "Git", icon: "git.svg" },
    { name: "GitHub", icon: "github.png" },
    { name: "Docker", icon: "docker.svg" },
    { name: "Linux", icon: "linux.svg" },
  ];

  const tech = [
    { Name: "Languages", details: programming_languages },
    { Name: "Frontend", details: frontend },
    { Name: "Backend", details: backend },
    { Name: "Databases", details: databases },
    { Name: "Tools", details: tools },
  ];

  return (
    <motion.div
      className="max-w-5xl mx-auto w-full p-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tech.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
            className="p-4 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000]">
            <h3 className="text-base font-bold mb-3 text-[#F0F0F0] tracking-widest uppercase">
              {category.Name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.details.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: itemIndex * 0.05 }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-none bg-[#3A3A3A] border border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#4A4A4A] transition-colors">
                  <Image
                    src={`/skill/${item.icon}`}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs text-[#D0D0D0] font-mono">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
