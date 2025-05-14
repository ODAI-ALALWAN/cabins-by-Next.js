'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MenuClient({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navigation List */}
      <ul
        className={`
          flex-col md:flex-row md:flex md:gap-5 gap-4 absolute md:static top-12 right-1 md:w-auto p-4 md:p-0
          transition-all duration-300 ease-in-out 
          ${menuOpen ? 'flex bg-accent-500 p-6' : 'hidden'}
        `}
      >
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors block">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors block">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account" className="hover:text-accent-400 transition-colors flex   items-center gap-4">
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link href="/account" className="hover:text-accent-400 text-nowrap  transition-colors block">
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </>
  );
}
