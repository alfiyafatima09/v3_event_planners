// import type { Metadata } from "next";
// import "./globals.css";
// import { AuthProvider } from './auth/AuthContext'; // Import AuthProvider
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { Exo_2 } from 'next/font/google';
// import ProtectedRoute from '@/app/auth/ProtectedRoute';

// const roboto = Exo_2({ subsets: ['latin'], weight: '500' });

// export const metadata: Metadata = {
//   title: "V3_Events",
//   description: "Make your events more engaging with V3_Events",
//   icons: {
//     icon: "/rounded_logo2.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={roboto.className}>
//         <AuthProvider> {/* Wrap content with AuthProvider */}
//           <Navbar />
//           <ProtectedRoute>{children}</ProtectedRoute>
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Ensure this contains your old styles
import { AuthProvider } from './auth/AuthContext';
import Navbar from '@/components/Navbar'; // Ensure Navbar has styles intact
import Footer from '@/components/Footer'; // Ensure Footer has styles intact
import { Exo_2 } from 'next/font/google';
import LayoutWrapper from './LayoutWrapper';

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-100 text-gray-900`}>
        <AuthProvider>
          <Navbar />
          <LayoutWrapper>{children}</LayoutWrapper>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
