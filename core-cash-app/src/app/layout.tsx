import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import ReduxProvider from "@/store/Provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Core Cash Agent",
  description: "Treasury / Agentic AI Cash & Liquidity Decision Layer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ReduxProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
