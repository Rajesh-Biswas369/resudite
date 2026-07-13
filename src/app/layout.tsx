import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resudite Studio",
  description: "A digital, animated and professional resume-building studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
