// src/components/Navbar.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    // Switched to bg-transparent, removed border, and heavily increased padding to push items center
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-16 lg:px-25 py-4 flex items-center justify-between pointer-events-auto">
      
      {/* LEFT: Logo & Brand Name */}
      <div className="flex items-center gap-4">
        <Image 
          src="/images/Group 4.webp" 
          alt="LeakSense Logo" 
          width={36} // Increased size from 36
          height={36}
          className="object-contain"
        />
        {/* Increased text size to 4xl */}
        <span className="text-white font-montserrat font-[600] text-2xl tracking-wide drop-shadow-md">
          LeakSense
        </span>
      </div>

      {/* RIGHT: Navigation Links */}
      <div className="flex items-center">
        {/* Increased text size to 2xl and bumped weight to 600 for better visibility */}
        <Link 
          href="#" 
          className="text-white font-montserrat font-[500] text-1xl hover:text-gray-300 transition-colors drop-shadow-md"
        >
          Home
        </Link>
      </div>
      
    </nav>
  );
}