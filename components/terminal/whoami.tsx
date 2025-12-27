"use client";
import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Calendar,
  User,
  Github,
  Linkedin,
  Instagram,
  FacebookIcon,
} from "lucide-react";

interface ContactInfo {
  email: string;
  fullName: string;
  city: string;
  age: number;
  socialProfiles: {
    name: string;
    url: string;
    icon: React.ReactNode;
    color: string;
  }[];
}

const contactData: ContactInfo = {
  email: "minbanyartalahtaw@proton.me",
  fullName: "Min Banyar Tala Htaw",
  city: "Bangkok, Thailand",
  age: 20,
  socialProfiles: [
    {
      name: "GitHub",
      url: "https://github.com/minbanyartalahtaw",
      icon: <Github className="w-5 h-5" />,
      color: "hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/min-banyar-tala-htaw-a0307934a/",
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/dumarkslife/",
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:bg-pink-600",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/dev.banyar/",
      icon: <FacebookIcon className="w-5 h-5" />,
      color: "hover:bg-pink-600",
    },
  ],
};

export function Whoami() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
      {/* Social Profiles */}
      <div className="space-y-4">
        <motion.div
          className="p-4 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}>
          <h3 className="text-lg font-semibold mb-3 text-slate-100">
            Social Profiles
          </h3>
          <div className="flex flex-wrap gap-2">
            {contactData.socialProfiles.map((profile, index) => (
              <motion.a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-none bg-[#3A3A3A] border border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#4A4A4A] transition-all duration-300 flex items-center justify-center`}
                custom={index}
                whileTap={{ scale: 0.95 }}>
                <motion.div className="w-5 h-5 text-[#D0D0D0]">
                  {profile.icon}
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="p-4 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}>
          <h3 className="text-lg font-semibold b-3 text-slate-100">
            Work Experience
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000]">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#D0D0D0] text-sm font-medium">
                  Full Stack Developer
                </h4>
                <span className="text-slate-400 text-xs">2023 - Present</span>
              </div>
              <p className="text-slate-300 text-xs">
                Building scalable web applications with modern technologies
              </p>
            </div>
            <div className="p-3 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000]">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[#D0D0D0] text-sm font-medium">
                  Frontend Developer
                </h4>
                <span className="text-slate-400 text-xs">2022 - 2023</span>
              </div>
              <p className="text-slate-300 text-xs">
                Creating responsive and interactive user interfaces
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 }}>
        <div className="p-4 rounded-none bg-[#2C2C2C] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#000000] h-full">
          <h3 className="text-lg font-semibold mb-3 text-slate-100">
            Contact Information
          </h3>
          <div>
            <div className="flex items-center gap-3 p-2 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#4A4A4A] transition-colors">
              <div className="p-1.5  bg-[#2A2A2A]  rounded-md">
                <Mail className="w-4 h-4 text-[#D0D0D0]" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-slate-100 text-sm font-medium">
                  {contactData.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#4A4A4A] transition-colors">
              <div className="p-1.5 bg-[#2A2A2A]  rounded-md">
                <User className="w-4 h-4 text-[#D0D0D0]" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Full Name</p>
                <p className="text-slate-100 text-sm font-medium">
                  {contactData.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#4A4A4A] transition-colors">
              <div className="p-1.5 bg-[#2A2A2A]  rounded-md">
                <MapPin className="w-4 h-4 text-[#D0D0D0]" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-slate-100 text-sm font-medium">
                  {contactData.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-none bg-[#3A3A3A] border-2 border-[#1A1A1A] shadow-[1px_1px_0px_#000000] hover:bg-[#4A4A4A] transition-colors">
              <div className="p-1.5 bg-[#2A2A2A]  rounded-md">
                <Calendar className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <p className="text-xs text-[#D0D0D0]">Age</p>
                <p className="text-slate-100 text-sm font-medium">
                  {contactData.age} years old
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
