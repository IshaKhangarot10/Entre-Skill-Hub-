'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Hide on onboarding/auth pages
  const hideOn = ['/login', '/register', '/onboarding', '/admin/login', '/mentor/register'];
  if (hideOn.some(p => pathname.startsWith(p))) return null;

  // Admin pages use sidebar instead
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') return null;

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const navLinks = user?.role === 'mentor' 
    ? [
        { href: '/mentor/dashboard', label: 'Home', icon: 'dashboard' },
        { href: '/mentor/mentees', label: 'Mentees', icon: 'group' },
        { href: '/mentor/upload', label: 'Resources', icon: 'library_books' },
        { href: '/mentor/settings', label: 'Profile', icon: 'account_circle' },
      ]
    : [
        { href: '/dashboard', label: 'HOME', icon: 'home' },
        { href: '/recommendations', label: 'ROADMAPS', icon: 'map' },
        { href: '/mentors', label: 'MENTORS', icon: 'school' },
        { href: '/profile', label: 'PROFILE', icon: 'person' },
      ];

  return (
    <header className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-[64px] py-[12px] bg-[#f9f9f9]/80 backdrop-blur-xl border-b border-[#c4c7c7]/30 shadow-sm">
      <Link href={user ? '/dashboard' : '/'} className="font-['Playfair_Display'] text-[48px] leading-[52px] tracking-[-0.02em] font-semibold text-black">
        SkillSpark
      </Link>
      {user ? (
        <>
          <nav className="flex gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-['Inter'] text-[11px] leading-[16px] tracking-[0.12em] font-semibold uppercase flex items-center gap-2 transition-opacity hover:opacity-80 ${
                  isActive(link.href) ? 'text-black font-bold' : 'text-[#646464]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isActive(link.href) ? "'wght' 400" : "'wght' 200" }}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'wght' 200" }}>notifications</span>
            </Link>
            <button onClick={logout} className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-[#646464] hover:text-black transition-colors">
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-8 items-center">
            <Link href="/how-it-works" className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-[#444748]/60 hover:text-black transition-colors">How It Works</Link>
            <Link href="/mentors" className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-[#444748]/60 hover:text-black transition-colors">Mentors</Link>
          </div>
          <Link href="/login" className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
            SIGN IN
          </Link>
        </>
      )}
    </header>
  );
}
