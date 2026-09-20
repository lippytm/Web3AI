import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3AI - AI Jarvis Assistant",
  description: "AI Jarvis Assistant with bundled free AI tools for Web3 builders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
