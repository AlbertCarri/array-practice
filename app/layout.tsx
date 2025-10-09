import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const URL_BASE = "https://codechallenge.edelbyte.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(URL_BASE),
  title: {
    default: "Code Challenge: Retos de programación",
    template: "%s | Code Challenge",
  },
  description:
    "Practica y mejora tus habilidades con retos de programación interactivos en JavaScript. Aprende métodos de arrays y objetos con ejemplos reales",
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
  alternates: {
    canonical: URL_BASE,
    languages: {
      "es-AR": `${URL_BASE}`,
    },
  },
  openGraph: {
    title: "Code Challenge: Retos de programación en JavaScript",
    description:
      "Practica métodos de arrays y objetos en desafíos interactivos de JavaScript",
    siteName: URL_BASE,
    images: [
      {
        url: "https://codechallenge.edelbyte.com.ar/retosdecodigo.webp",
        width: 1200,
        height: 630,
        alt: "Plataforma de retos de programación en JavaScript",
      },
    ],
    locale:"es-AR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut:"/favicon-16x16.png",
    apple:"/apple-touch-icon.png"
  },
};

const miFuente = localFont({
  src: [
    {
      path: "./fonts/PlaywriteCL-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-miFuente",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark ${miFuente.variable}`}>
      <body className={"font-sans"}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
