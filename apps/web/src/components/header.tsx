"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <nav className="flex gap-4 text-lg">
          <Link href="/" className="font-semibold">
            Fylo
          </Link>
        </nav>
      </div>
      <hr />
    </header>
  );
}
