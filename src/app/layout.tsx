import type { Metadata } from "next";
import { Playfair_Display, Roboto, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./root-client-layout";


const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap", // Important for performance
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rabin Karmakar - Full Stack Developer Portfolio",
    template: "%s | Rabin Karmakar - Full Stack Developer"
  },
  description: "Experienced Full Stack Developer with 3+ years of expertise in React, Node.js, TypeScript, and modern web technologies. View my projects, skills, and professional experience.",
  keywords: [
    "full stack developer",
    "react developer",
    "node.js developer",
    "typescript",
    "javascript",
    "web developer",
    "frontend developer",
    "backend developer",
    "portfolio",
    "software engineer"
  ],
  authors: [{ name: "Rabin Karmakar" }],
  creator: "Rabin Karmakar",
  publisher: "Rabin Karmakar",
  metadataBase: new URL("https://profile-eight-zeta-45.vercel.app/"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://profile-eight-zeta-45.vercel.app/",
    title: "Rabin Karmakar - Full Stack Developer Portfolio",
    description: "Experienced Full Stack Developer with 3+ years of expertise in React, Node.js, TypeScript, and modern web technologies.",
    siteName: "Rabin Karmakar Portfolio",
    images: [
      {
        url: "/profile.jpeg", // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "Rabin Karmakar - Full Stack Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />

        {/* Additional performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rabin Karmakar",
              jobTitle: "Full Stack Developer",
              description: "Experienced Full Stack Developer with 3+ years of expertise",
              url: "https://profile-eight-zeta-45.vercel.app/",
              sameAs: [
                "https://www.linkedin.com/in/rabin-642894219/",
                "https://github.com/rabin97",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Explorogent International Services Pvt. Ltd. (Stackkaroo)"
              },
              knowsAbout: [
                "React",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Full Stack Development",
                "Web Development"
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Bankura Unnayani Institute of Engeneering"
              }
            })
          }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${roboto.variable} ${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  );
}