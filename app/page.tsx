"use client";

import { useState } from "react";
import Terminal from "../components/terminal/Terminal";
import MatrixWaveBackground from "../components/background/MatrixWaveBackground";
import { Slider } from "../components/ui/slider";

type MatrixTheme =
  | "green"
  | "blue"
  | "pink"
 | "cyan"
  | "purple"
  | "amber"
  | "lime"
  | "mono";

const THEME_OPTIONS: Array<{
  value: MatrixTheme;
  label: string;
  activeClass: string;
}> = [
  { value: "green", label: "Green", activeClass: "bg-[#1f3d1f] border-[#4a7c2a]" },
  { value: "blue", label: "Blue", activeClass: "bg-[#1d3557] border-[#5aa9ff]" },
  { value: "pink", label: "Pink", activeClass: "bg-[#4a1e3f] border-[#ff5bb2]" },
  { value: "cyan", label: "Cyan", activeClass: "bg-[#113a43] border-[#4dd0e1]" },
  { value: "purple", label: "Purple", activeClass: "bg-[#2f1d52] border-[#b388ff]" },
  { value: "amber", label: "Amber", activeClass: "bg-[#4a3818] border-[#ffca5f]" },
  { value: "lime", label: "Lime", activeClass: "bg-[#31421a] border-[#b7f774]" },
  { value: "mono", label: "Mono", activeClass: "bg-[#2f353b] border-[#d3d9df]" },
];

const FLOATING_WORDS = [
  "Apple",
  "Mango",
  "dumark",
  "text",
  "code",
  "design",
  "developer",
  "portfolio",
  "react",
  "nextjs",
  "typescript",
  "javascript",
  "web",
  "frontend",
  "backend",
  "fullstack",
  "software",
  "engineer",
  "programming",
  "technology",
];

export default function Home() {
  const [backgroundFocus, setBackgroundFocus] = useState(35);
  const [matrixTheme, setMatrixTheme] = useState<MatrixTheme>("green");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [terminalWindowState, setTerminalWindowState] = useState<
    "open" | "minimized" | "closed"
  >("open");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04080a]">
      <MatrixWaveBackground
        words={FLOATING_WORDS}
        centerFocus={backgroundFocus}
        theme={matrixTheme}
      />

      {terminalWindowState !== "open" && (
        <div className="fixed top-2 left-1/2 z-40 w-[min(92vw,520px)] -translate-x-1/2 rounded-full border border-white/10 bg-[rgba(3,9,14,0.55)] px-3 py-2 backdrop-blur-sm">
          <Slider
            value={[backgroundFocus]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setBackgroundFocus(value[0] ?? 35)}
            aria-label="Background focus"
            className="[&_[data-slot=slider-track]]:bg-[#13242f] [&_[data-slot=slider-range]]:bg-[#4a7c2a] [&_[data-slot=slider-thumb]]:border-[#5e8f3a] [&_[data-slot=slider-thumb]]:bg-[#0c151d]"
          />
        </div>
      )}

      {terminalWindowState !== "open" && showThemePicker && (
        <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-xl border border-white/20 bg-[rgba(8,18,28,0.82)] p-2 backdrop-blur-md">
          <div className="grid grid-cols-5 gap-2">
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMatrixTheme(option.value)}
                className={`h-9 rounded-md px-3 text-sm text-white transition-colors border ${
                  matrixTheme === option.value
                    ? option.activeClass
                    : "bg-[rgba(18,30,42,0.8)] border-white/10"
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen">
        <Terminal
          onWindowStateChange={(state) => {
            setTerminalWindowState(state);
            if (state === "open") {
              setShowThemePicker(false);
            }
          }}
          onThemeButtonClick={() => setShowThemePicker((prev) => !prev)}
        />
      </div>
    </div>
  );
}
