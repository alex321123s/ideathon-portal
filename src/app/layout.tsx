import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ideathon Portal - Collaborative Sprint System",
  description: "A high-octane, gamified platform for collaborative ideation sprints with real-time challenges, balanced matchmaking, and legacy progression.",
  keywords: ["ideathon", "hackathon", "collaboration", "sprint", "innovation", "gamification"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
