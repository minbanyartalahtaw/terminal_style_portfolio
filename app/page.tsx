import Terminal from "../components/terminal/Terminal";

export default function Home() {
  return (
    // Bubble background > [background-image:radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]
    <div className="flex items-center justify-center p-2">
      <Terminal />
    </div>
  );
}
