import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-4">
      <div className="mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity text-black"
        >
          Gallery
        </Link>
        <Link
          href="/upload"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity text-black"
        >
          Upload
        </Link>
      </div>
    </nav>
  );
}
