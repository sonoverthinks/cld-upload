import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Banana Gallery",
  description: "Personal AI Art Collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <Navbar />
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
