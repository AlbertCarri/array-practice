import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Thinking",
  description: "Retos de programación",
  openGraph: {
    title: "Retos de programación",
    description: "Practicando arrays y objetos en javascript",
    images: ["https://codechallenge.edelbyte.com.ar/retosdecodigo.webp"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en" className={`dark ${miFuente.variable}`}>
      <body className={"font-sans"}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
