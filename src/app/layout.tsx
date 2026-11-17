import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { CursorTrail } from "@/components/animations/CursorTrail";

const playfairDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/playfair-display/PlayfairDisplay-VariableFont_wght.ttf",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-playfair-display",
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ppneumontreal = localFont({
  src: [
    {
      path: "../../public/fonts/pp-neue-montreal/ppneuemontreal-thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/pp-neue-montreal/ppneuemontreal-book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/pp-neue-montreal/ppneuemontreal-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/pp-neue-montreal/ppneuemontreal-bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/pp-neue-montreal/ppneuemontreal-italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/pp-neue-montreal/ppneuemontreal-semibolditalic.woff",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-ppneumontreal-family",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Rizky Aziz Portfolio",
  description: "A portfolio website showcasing the work and projects of Rizky Aziz, a talented developer and designer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${ppneumontreal.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col p-6">
        <SmoothScroll />
        {/* <CursorTrail /> */}
        {children}
      </body>
    </html>
  );
}
