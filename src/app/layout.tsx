// src/app/layout.tsx
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Bebas_Neue,
  Bricolage_Grotesque,
  Kode_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  variable: "--font-kode",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Naimur Rahman Nishat",
  description: "Portfolio of Naimur Rahman Nishat from Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        poppins.variable,
        bebasNeue.variable,
        bricolage.variable,
        kodeMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-poppins">{children}</body>
    </html>
  );
}
