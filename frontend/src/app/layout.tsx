import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Exo_2 } from "next/font/google";

const roboto = Exo_2({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "V3_Events",
  description: "Make your events more engaging with V3_Events",
  icons: {
    icon: "/rounded_logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
