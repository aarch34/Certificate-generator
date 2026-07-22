import type { Metadata } from "next";
import { Inter, Cinzel, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Yodha Certificate Generator - RCSB",
  description: "Instantly generate and download your personalized Certificate of Participation for the Project Yodha Kargil Hero speaker session organized by the Rotaract Club of Swarna Bengaluru.",
  keywords: ["Project Yodha", "RCSB", "Rotaract Club of Swarna Bengaluru", "Kargil Hero", "Certificate Generator", "Rotary"],
  authors: [{ name: "Rotaract Club of Swarna Bengaluru" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${greatVibes.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#060907] text-[#f8fcf9] font-sans antialiased flex flex-col justify-between overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
