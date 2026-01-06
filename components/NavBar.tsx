import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
      <Link href="/" className="text-xl px-4 py-2">
        Home
      </Link>
      <Link href="/upload" className="px-4 py-2 rounded-full text-xl">
        Upload Image
      </Link>
    </nav>
  );
}
