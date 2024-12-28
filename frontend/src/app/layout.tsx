import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from './auth/AuthContext'; // Import AuthProvider
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Exo_2 } from 'next/font/google';
import ProtectedRoute from '@/app/auth/ProtectedRoute';

const roboto = Exo_2({ subsets: ['latin'], weight: '500' });

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
        <AuthProvider> {/* Wrap content with AuthProvider */}
          <Navbar />
          <ProtectedRoute>{children}</ProtectedRoute>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
