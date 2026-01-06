import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Banana Gallery",
  description: "Personal Collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black max-w-7xl px-4">
        <Navbar />
        <main className="mx-auto">{children}</main>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
