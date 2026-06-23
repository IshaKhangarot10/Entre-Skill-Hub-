'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Hide on certain pages
  const hideOn = ['/login', '/register', '/onboarding', '/admin', '/', '/mentor/register'];
  if (hideOn.some(p => pathname === p || (p !== '/' && pathname.startsWith(p)))) return null;
  if (pathname === '/') return null;
  if (!user) return null;

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const links = user?.role === 'mentor'
    ? [
        { href: '/mentor/dashboard', label: 'HOME', icon: 'dashboard' },
        { href: '/mentor/mentees', label: 'MENTEES', icon: 'group' },
        { href: '/mentor/upload', label: 'RESOURCES', icon: 'library_books' },
        { href: '/mentor/settings', label: 'PROFILE', icon: 'account_circle' },
      ]
    : [
        { href: '/dashboard', label: 'HOME', icon: 'home' },
        { href: '/recommendations', label: 'ROADMAPS', icon: 'map' },
        { href: '/mentors', label: 'MENTORS', icon: 'school' },
        { href: '/profile', label: 'PROFILE', icon: 'person' },
      ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-[24px] py-4 bg-[#f9f9f9]/60 backdrop-blur-2xl border-t border-[#c4c7c7]/20 shadow-[0_-20px_40px_rgba(0,0,0,0.04)] pb-8">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center justify-center transition-all font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase ${
            isActive(link.href)
              ? 'text-black border-b-2 border-black pb-1 scale-105'
              : 'text-[#646464] opacity-60 hover:opacity-100'
          }`}
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: isActive(link.href) ? "'FILL' 1" : "'FILL' 0" }}
          >
            {link.icon}
          </span>
          <span className="text-[9px]">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
