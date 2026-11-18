import type { Metadata } from "next";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Rizky Aziz" },
  description: site.description,
  applicationName: "Rizky Aziz Portfolio",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rizky Aziz Portfolio",
    title: site.title,
    description: site.description,
    url: site.url,
    images: [{
      url: "/images/og-preview.png",
      width: 3296,
      height: 1828,
      type: "image/png",
      alt: "Rizky Aziz — Frontend Engineer portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [{
      url: "/images/og-preview.png",
      alt: "Rizky Aziz — Frontend Engineer portfolio",
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${ppneumontreal.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col p-6">
        <SmoothScroll />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
