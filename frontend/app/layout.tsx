import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3AI - AI-Powered Web3 Application",
  description: "Full-stack AI and blockchain application starter",
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
