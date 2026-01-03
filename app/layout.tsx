import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "tty",
  description: "Portfolio of Dumark with tty interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-ubuntu antialiased ${ubuntu.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
