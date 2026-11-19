import type { Metadata } from "next";
import { site } from "@/lib/site";
import "./globals.css";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { geistMono, playfairDisplay, ppneumontreal, roboto } from "@/lib/fonts";
import { CursorTrail } from "@/components/animations/cursor-trail";
import { FooterSection } from "@/components/layout/footer";


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
        <FooterSection />
      </body>
    </html>
  );
}
