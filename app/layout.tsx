import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taher Hussain | Creative Technologist",
  description:
    "Portfolio of Taher Hussain, founder, creative technologist, and CTO building digital systems, media workflows, and AI-assisted operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
