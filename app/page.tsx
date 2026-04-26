import Terminal from "../components/terminal/Terminal";
import MatrixWaveBackground from "../components/background/MatrixWaveBackground";

export default function Home() {
  const floatingWords = [
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04080a]">
      <MatrixWaveBackground words={floatingWords} />

      <div className="relative z-10 min-h-screen">
        <Terminal />
      </div>
    </div>
  );
}
