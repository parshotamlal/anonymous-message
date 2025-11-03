import type { Metadata } from "next";
import Navbar from "@/components/navbar";
// import "./globals.css"; // global CSS must be on top

import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystery Message",
  description: "Anonymous messaging platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
       
          {children}
     
      </body>
      </AuthProvider>
    </html>
  );
}

