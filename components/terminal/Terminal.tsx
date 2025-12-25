"use client";

import { motion } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import { Contact } from "./Contact";
import Skills from "./Skills";
import { Minus, Square, SquareTerminal, X } from "lucide-react";
import { Timeline } from "./timeline";
import Image from "next/image";

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
  { cmd: "ls", desc: "List directory contents" },
  { cmd: "date", desc: "Display current date and time" },
  { cmd: "clear", desc: "Clear the screen" },
  { cmd: "help", desc: "Show available commands" },
];

const INITIAL_HISTORY: TerminalLine[] = [
  { type: "output", content: 'Type "help" to see available commands.' },
  { type: "output", content: "" },
];

// ==================== Data ====================
const PROJECT_DATA = [
  {
    title: "Discover Myanmar",
    content: (
      <div>
        <a
          href="https://discover-myanmar.vercel.app/user/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <Image
              key={num}
              src={`/project/discover-myanmar/dm-${num}.png`}
              alt={`Discover Myanmar screenshot ${num}`}
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
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
          share it with your friends, join other people's books, and engage with
          anonymous messages in a safe and fun environment.
        </p>
        <a
          href="https://untold-tan.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 mb-8 text-sm font-medium text-black bg-white rounded-lg">
          Visit Website
        </a>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3].map((num) => (
            <Image
              key={num}
              src={`/project/untold/untold-${num}.png`}
              alt={`untold screenshot ${num}`}
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
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
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
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
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
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
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
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

const TitleBar: React.FC = () => (
  <div className="bg-[#2D2D2D] h-10 flex items-center justify-between px-3 select-none border-b border-black/50">
    <div className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 cursor-pointer transition-colors">
      <SquareTerminal />
    </div>

    <div className="font-bold text-[#E6E6E6] text-sm tracking-wide flex-1 text-center">
      banyar@ubuntu
    </div>

    <div className="flex items-center gap-1">
      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
        <Minus />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors group">
        <Square />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#E95420] transition-colors group">
        <X />
      </button>
    </div>
  </div>
);

// ==================== Hooks ====================
const useAutoScroll = (dependency: any[]) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Desktop: smooth scroll to bottom
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
    // Mobile: Don't auto-scroll, let keyboard handle the scroll naturally
  }, dependency);

  return { bottomRef, containerRef };
};

// ==================== Command Handler ====================
const getCommandOutput = (cmd: string): React.ReactNode => {
  switch (cmd) {
    case "help":
      return <CommandHelp />;
    case "project":
      return <Timeline data={PROJECT_DATA} />;
    case "ls":
      return "Documents  Downloads  Music  Pictures  Public  Templates  Videos";
    case "date":
      return <DateOutput />;
    case "whoami":
      return <Contact />;
    case "skill":
      return <Skills />;
    default:
      return `${cmd} : command not found`;
  }
};

// ==================== Main Component ====================
const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_HISTORY);
  const [currentInput, setCurrentInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalWrapperRef = useRef<HTMLDivElement>(null);
  const { bottomRef, containerRef } = useAutoScroll([history]);

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
      { type: "output", content: getCommandOutput(lowerCaseCommand) },
    ];

    setHistory(newHistory);
    setCurrentInput("");

    // On mobile, blur input to hide keyboard after command execution
    if (window.innerWidth < 768 && inputRef.current) {
      inputRef.current.blur();

      // Re-center terminal after keyboard hides
      setTimeout(() => {
        if (terminalWrapperRef.current) {
          terminalWrapperRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300); // Wait for keyboard animation
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  if (loading) return null;

  return (
    <div className="w-full max-w-4xl" ref={terminalWrapperRef}>
      <motion.div
        className="mx-auto my-8 rounded-sm overflow-hidden font-mono text-sm bg-[#2C2C2C]  border-[#1A1A1A] shadow-[2px_2px_0px_#000000]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.08,
          delayChildren: 0.2,
        }}>
        <TitleBar />

        <div
          ref={containerRef}
          className="bg-[#300a24] text-white p-2 h-130  md:h-150 overflow-y-auto cursor-text scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-white scrollbar-track-slate-300"
          onClick={focusInput}>
          <div className="flex flex-col space-y-1">
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
      </motion.div>
    </div>
  );
};

export default Terminal;
