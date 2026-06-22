"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import {
  Minus,
  Square,
  SquareTerminal,
  X,
  ArrowLeft,
  Compass,
  Palette,
} from "lucide-react";
import { Button } from "../ui/button";
import Skills from "./skills";
import { Whoami } from "./whoami";
import { Timeline } from "./timeline";
import GitHubActivity from "./github";

// ==================== Types ====================
interface TerminalLine {
  type: "input" | "output";
  content: string | React.ReactNode;
  cwd?: string;
}

interface Command {
  cmd: string;
  desc: string;
  isImportant?: boolean;
}

// ==================== Constants ====================
const COMMANDS: Command[] = [
  { cmd: "whoami", desc: "Show about developer", isImportant: true },
  { cmd: "skill", desc: "Show skills", isImportant: true },
  { cmd: "project", desc: "Show projects", isImportant: true },
  { cmd: "git", desc: "Show git", isImportant: true },
  { cmd: "ls", desc: "List directory contents" },
  { cmd: "date", desc: "Display current date and time" },
  { cmd: "clear", desc: "Clear the screen" },
  { cmd: "help", desc: "Show available commands" },
];

const INITIAL_HISTORY: TerminalLine[] = [
  { type: "output", content: 'Type "help" to see available commands.' },
  { type: "output", content: "" },
];

const TERMINAL_ASSEMBLY_PIECES = [
  { top: "5%", left: "4%", width: "30%", height: "28%", fromX: -180, fromY: -110, fromZ: 260, fromRotateX: -18, fromRotateY: 16, delay: 0.0 },
  { top: "8%", left: "38%", width: "26%", height: "24%", fromX: 130, fromY: -120, fromZ: 220, fromRotateX: -14, fromRotateY: -18, delay: 0.05 },
  { top: "6%", left: "68%", width: "28%", height: "30%", fromX: 200, fromY: -80, fromZ: 280, fromRotateX: -20, fromRotateY: -12, delay: 0.1 },
  { top: "40%", left: "6%", width: "31%", height: "27%", fromX: -190, fromY: 30, fromZ: 200, fromRotateX: 10, fromRotateY: 18, delay: 0.12 },
  { top: "39%", left: "39%", width: "24%", height: "25%", fromX: 0, fromY: 140, fromZ: 260, fromRotateX: 22, fromRotateY: 0, delay: 0.16 },
  { top: "40%", left: "66%", width: "30%", height: "28%", fromX: 170, fromY: 24, fromZ: 230, fromRotateX: 12, fromRotateY: -20, delay: 0.2 },
  { top: "73%", left: "10%", width: "36%", height: "22%", fromX: -120, fromY: 140, fromZ: 250, fromRotateX: 18, fromRotateY: 12, delay: 0.24 },
  { top: "72%", left: "50%", width: "40%", height: "22%", fromX: 120, fromY: 150, fromZ: 240, fromRotateX: 16, fromRotateY: -10, delay: 0.28 },
];

// ==================== Data for TimeLine Compo  ====================
const PROJECT_DATA = [
      {
    title: "Pasteboard",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
          Turn your html code into the presentation slides.
        </p>
        <a
          href="https://pasteboard.design"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a>
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4,5,6,7,8].map((num) => (
            <Image
              key={num}
              src={`/project/pasteboard/pb-${num}.png`}
              alt={`Discover Myanmar screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg  shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
    {
    title: "Chan Htaw",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
          Back Office system for Chan Htaw. Showcase with demo data.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {[1, 2,3,4,5].map((num) => (
            <Image
              key={num}
              src={`/project/chanhtaw/chanhtaw-${num}.png`}
              alt={`Discover Myanmar screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Music Player in your terminal.",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
          A terminal-based music player built in Rust. Stream your favorite
          tracks with a clean, intuitive interface and built-in equalizer. Also
          this project is my first project using with vibe coding.
        </p>
        <a
          href="https://github.com/minbanyartalahtaw/tui_music_player"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Repo Link
        </a>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((num) => (
            <Image
              key={num}
              src={`/project/tui_music_player/music_player_${num}.png`}
              alt={`Discover Myanmar screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Discover Myanmar",
    content: (
      <div>
        {/*         <a
          href="https://discover-myanmar.vercel.app/user/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a> */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <Image
              key={num}
              src={`/project/discover-myanmar/dm-${num}.png`}
              alt={`Discover Myanmar screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "untold",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-200 md:text-sm">
          untold is like NGL with better features. You can create a book and
          share it with your friends, join other people&apos;s books, and engage
          with anonymous messages in a safe and fun environment.
        </p>
        {/* <a
          href="https://untold-tan.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a> */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3].map((num) => (
            <Image
              key={num}
              src={`/project/untold/untold-${num}.png`}
              alt={`untold screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "ch2k",
    content: (
      <div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <Image
              key={num}
              src={`/project/ch2k/ch2k-${num}.png`}
              alt={`ch2k screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Au-Helper",
    content: (
      <div>
        <a
          href="https://au-helper.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 4, 3].map((num) => (
            <Image
              key={num}
              src={`/project/au-helper/au-helper-${num}.png`}
              alt={`AU-Helper screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Snake and Ladder",
    content: (
      <div>
        <a
          href="https://snake-ladder-eight.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <Image
              key={num}
              src={`/project/snake-ladder/sl-${num}.png`}
              alt={`Snake and Ladder screenshot ${num}`}
              width={500}
              height={500}
              className="h-32 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-80 xl:h-96"
            />
          ))}
        </div>
      </div>
    ),
  },
];

// ==================== Helper Components ====================
const TerminalPrompt: React.FC<{ cwd: string }> = ({ cwd }) => (
  <>
    <span className="text-[#8ae234] font-bold">banyar@ubuntu</span>
    <span className="text-[#729fcf] font-bold px-1">{cwd}</span>
    <span className="text-white mr-2">$</span>
  </>
);

const CommandHelp: React.FC = () => (
  <div className="mt-1 mb-2">
    <div className="grid grid-cols-3 gap-x-6 gap-y-1">
      {COMMANDS.map(({ cmd, desc, isImportant }) => (
        <React.Fragment key={cmd}>
          <span className="font-semibold text-yellow-300">{cmd}</span>
          <span
            className={`col-span-2 ${
              isImportant ? "text-[#8ae234]" : "text-[#d3d7cf]"
            }`}>
            {desc}
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const DateOutput: React.FC = () => {
  const now = new Date();
  return (
    <div className="text-[#d3d7cf]">
      <span className="text-[#729fcf] font-semibold">Today</span> is{" "}
      <span className="text-[#8ae234]">
        {now.toLocaleDateString(undefined, { weekday: "long" })}
      </span>
      ,{" "}
      <span className="text-yellow-300">
        {now.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
      </span>{" "}
      <span className="text-[#ad7fa8]">{now.getFullYear()}</span> at{" "}
      <span className="text-[#34e2e2]">
        {now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

const TitleBar: React.FC<{
  title?: string;
  onMinimize: () => void;
  onClose: () => void;
}> = ({
  title = "banyar@ubuntu",
  onMinimize,
  onClose,
}) => (
  <div className="bg-[rgba(38,52,64,0.62)] h-10 flex items-center justify-between px-3 select-none border-b border-white/15">
    <Button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
      <SquareTerminal />
    </Button>

    <div className="font-bold text-[#E6E6E6] text-sm tracking-wide flex-1 text-center">
      {title}
    </div>

    <div className="flex items-center gap-1 text-white">
      <Button
        onClick={onMinimize}
        aria-label="Minimize terminal"
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
        <Minus />
      </Button>
      <Button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
        <Square />
      </Button>
      <Button
        onClick={onClose}
        aria-label="Close terminal"
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#E95420] transition-colors group">
        <X />
      </Button>
    </div>
  </div>
);

// ==================== Projects View Component ====================
const ProjectsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full min-h-screen rounded-none overflow-hidden font-mono text-sm liquid-glass-panel">
      <div className="text-white h-screen overflow-y-auto p-6 md:p-10 liquid-glass-inner scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-white/60 scrollbar-track-slate-300/30">
        <Timeline data={PROJECT_DATA} />
        <div className="mt-8 mb-10">
          <Button onClick={onBack}>
            <div className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Terminal
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== Hooks ====================
const useAutoScroll = (dependency: number) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, [dependency]);

  return { bottomRef, containerRef };
};

// ==================== Command Handler ====================
const getCommandOutput = (
  cmd: string,
  onViewProjects: () => void,
): React.ReactNode => {
  switch (cmd) {
    case "help":
      return <CommandHelp />;
    case "project":
      return (
        <Button onClick={onViewProjects}>View projects {<Compass />}</Button>
      );
    case "ls":
      return "Documents  Downloads  Music  Pictures  Public  Templates  Videos";
    case "date":
      return <DateOutput />;
    case "whoami":
      return <Whoami />;
    case "skill":
      return <Skills />;
    case "git":
      return <GitHubActivity />;
    default:
      return `${cmd} : command not found`;
  }
};

// ==================== Main Component ====================
interface TerminalProps {
  onWindowStateChange?: (state: "open" | "minimized" | "closed") => void;
  onThemeButtonClick?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({
  onWindowStateChange,
  onThemeButtonClick,
}) => {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY);
  const [currentInput, setCurrentInput] = useState("");
  const cwd = "~";
  const [showProjects, setShowProjects] = useState(false);
  const [windowState, setWindowState] = useState<"open" | "minimized" | "closed">("open");

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalWrapperRef = useRef<HTMLDivElement>(null);
  const { bottomRef, containerRef } = useAutoScroll(history.length);

  const handleViewProjects = () => {
    setShowProjects(true);
  };

  const handleBackToTerminal = () => {
    setHistory(INITIAL_HISTORY);
    setShowProjects(false);
  };

  const handleMinimize = () => {
    setShowProjects(false);
    setWindowState("minimized");
  };

  const handleClose = () => {
    setShowProjects(false);
    setHistory(INITIAL_HISTORY);
    setCurrentInput("");
    setWindowState("closed");
  };

  const handleOpen = () => {
    setWindowState("open");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    const lowerCaseCommand = cmd.toLowerCase();

    if (lowerCaseCommand === "clear") {
      setHistory([]);
      setCurrentInput("");
      return;
    }

    const newHistory: TerminalLine[] = [
      ...history,
      { type: "input", content: lowerCaseCommand, cwd },
      {
        type: "output",
        content: getCommandOutput(lowerCaseCommand, handleViewProjects),
      },
    ];

    setHistory(newHistory);
    setCurrentInput("");

    if (window.innerWidth < 768 && inputRef.current) {
      inputRef.current.blur();

      setTimeout(() => {
        if (terminalWrapperRef.current) {
          terminalWrapperRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    onWindowStateChange?.(windowState);
  }, [windowState, onWindowStateChange]);

  return (
    <div
      className={`relative z-10 w-full ${
        showProjects && windowState === "open"
          ? "max-w-none mx-0 px-0"
          : "max-w-4xl mx-auto px-5 md:px-6"
      }`}
      ref={terminalWrapperRef}>
      <AnimatePresence>
        {windowState !== "open" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleOpen}
                className="h-11 px-5 rounded-full border border-white/20 bg-[rgba(14,24,34,0.88)] text-white hover:bg-[rgba(22,35,48,0.95)]">
                <span className="inline-flex items-center gap-2">
                  <SquareTerminal size={16} />
                  Open Terminal
                </span>
              </Button>

              <Button
                onClick={onThemeButtonClick}
                className="h-11 px-4 rounded-full border border-white/20 bg-[rgba(14,24,34,0.88)] text-white hover:bg-[rgba(22,35,48,0.95)]">
                <span className="inline-flex items-center gap-2">
                  <Palette size={16} />
                  Theme
                </span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {windowState === "open" && !showProjects ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95, rotateX: -8, rotateY: 3, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, rotateX: 4, y: -6 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative mx-auto my-10 rounded-xl overflow-hidden font-mono text-sm liquid-glass-panel [perspective:1400px]">
            <div className="pointer-events-none absolute inset-0 z-0 [transform-style:preserve-3d]">
              {TERMINAL_ASSEMBLY_PIECES.map((piece, index) => (
                <motion.div
                  key={index}
                  style={{
                    top: piece.top,
                    left: piece.left,
                    width: piece.width,
                    height: piece.height,
                  }}
                  initial={{
                    opacity: 0.82,
                    x: piece.fromX,
                    y: piece.fromY,
                    z: piece.fromZ,
                    rotateX: piece.fromRotateX,
                    rotateY: piece.fromRotateY,
                    scale: 0.84,
                  }}
                  animate={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.58,
                    delay: piece.delay,
                    ease: [0.18, 0.9, 0.25, 1],
                  }}
                  className="absolute rounded-lg border border-white/16 bg-[linear-gradient(145deg,rgba(190,226,255,0.22),rgba(88,131,179,0.08))] shadow-[0_10px_22px_rgba(0,0,0,0.34)]"
                />
              ))}
            </div>

            <div className="relative z-10">
              <TitleBar onMinimize={handleMinimize} onClose={handleClose} />

              <div
                ref={containerRef}
                className="liquid-glass-inner text-white p-4 md:p-6 h-130 md:h-150 overflow-y-auto cursor-text leading-relaxed scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-white/60 scrollbar-track-slate-300/30"
                onClick={focusInput}>
                <div className="flex flex-col space-y-2">
                  {history.map((line, index) => (
                    <div key={index} className="break-words">
                      {line.type === "input" ? (
                        <div>
                          <TerminalPrompt cwd={line.cwd || cwd} />
                          <span className="text-yellow-300">{line.content}</span>
                        </div>
                      ) : typeof line.content === "string" ? (
                        <div className="whitespace-pre-wrap">{line.content}</div>
                      ) : (
                        <>{line.content}</>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center mt-1">
                  <TerminalPrompt cwd={cwd} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 p-0 text-base font-ubuntu text-yellow-300"
                    autoComplete="off"
                    spellCheck="false"
                    inputMode="text"
                    enterKeyHint="send"
                  />
                </div>
                <div ref={bottomRef} />
              </div>
            </div>
          </motion.div>
        ) : windowState === "open" ? (
          <ProjectsView key="projects" onBack={handleBackToTerminal} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Terminal;
