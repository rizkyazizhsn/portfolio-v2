import localFont from "next/font/local";
import { Roboto, Geist_Mono } from "next/font/google";

export const playfairDisplay = localFont({
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

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const ppneumontreal = localFont({
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

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});