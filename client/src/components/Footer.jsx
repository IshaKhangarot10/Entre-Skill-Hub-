'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  // Hide on app pages (show only on landing/public pages)
  const showOn = ['/', '/how-it-works', '/login', '/register'];
  if (!showOn.includes(pathname)) return null;

  return (
    <footer className="bg-[#f9f9f9] text-black font-['Inter'] text-[10px] tracking-[0.05em] font-medium w-full border-t border-[#c4c7c7]/20 flex flex-col md:flex-row justify-between items-center px-[64px] py-[12px] mt-[120px] z-10">
      <div className="font-['Playfair_Display'] text-[48px] leading-[52px] tracking-[-0.02em] font-semibold text-black mb-6 md:mb-0">
        SKILLSPARK
      </div>
      <div className="flex gap-8 mb-6 md:mb-0">
        <Link href="#" className="text-[#444748] hover:opacity-50 transition-opacity duration-300 uppercase">PRIVACY</Link>
        <Link href="#" className="text-[#444748] hover:opacity-50 transition-opacity duration-300 uppercase">TERMS</Link>
        <Link href="#" className="text-[#444748] hover:opacity-50 transition-opacity duration-300 uppercase">CONTACT</Link>
      </div>
      <div className="text-[#444748] opacity-50 uppercase">
        ©2024 SKILLSPARK. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
