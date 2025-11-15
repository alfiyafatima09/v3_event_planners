import type { Metadata } from "next";
import Navbar from "@/components/Navbar"; // Ensure Navbar has styles intact
import Footer from "@/components/Footer"; // Ensure Footer has styles intact
import { Exo_2 } from "next/font/google";
import "./globals.css";

const roboto = Exo_2({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "V3_Events",
  description: "Make your events more engaging with V3_Events",
  icons: {
    icon: "/rounded_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-100 text-gray-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
