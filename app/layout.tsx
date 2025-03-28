import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import SkipToContent from "@/components/SkipToContent";
import Loader from "@/components/Loader";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Roman Sypchenko - Software Developer",
    default: "Roman Sypchenko | Software Developer",
  },
  description: "Full-stack developer specializing in React, Next.js, and Node.js. View my portfolio of projects and get in touch for collaboration opportunities.",
  keywords: ["Software Developer", "Web Developer", "React", "Next.js", "Node.js", "Frontend", "Backend", "Full Stack"],
  authors: [{ name: "Roman Sypchenko", url: "https://johndoe.dev" }],
  creator: "Roman Sypchenko",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndoe.dev",
    siteName: "Roman Sypchenko Portfolio",
    title: "Roman Sypchenko | Software Developer",
    description: "Full-stack developer specializing in React, Next.js, and Node.js",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Roman Sypchenko - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Sypchenko | Software Developer",
    description: "Full-stack developer specializing in React, Next.js, and Node.js",
    creator: "@johndoe",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL("https://johndoe.dev"),
};

// Viewport metadata
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#161B23' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Loader />
          <SkipToContent />
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
