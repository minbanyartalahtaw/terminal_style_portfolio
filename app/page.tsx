import Terminal from "./components/Terminal";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-center   [background-image:radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]">
        <Terminal />
      </main>
    </div>
  );
}
