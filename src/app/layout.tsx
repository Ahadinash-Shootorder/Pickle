import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Pachadi Project",
  description: "Homemade pickles crafted with love",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
