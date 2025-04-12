import type { Metadata } from "next";
import "./globals.css";
import { bigShouldersDisplay, helveticaCompressed } from "@/app/fonts";

export const metadata: Metadata = {
  title: "E-Cell Website",
  description: "E-Cell's official website for Xcelerate Ideathon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bigShouldersDisplay.variable} ${helveticaCompressed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
