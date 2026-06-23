'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') router.push('/admin/analytics');
      else if (user.role === 'mentor') router.push('/mentor/dashboard');
      else if (user.onboardingComplete) router.push('/dashboard');
      else router.push('/onboarding/skills');
    }
  }, [user, router]);

  return (
    <div className="bg-white text-[#1a1c1c] min-h-screen flex flex-col">
      {/* Main Canvas */}
      <div className="flex-grow pt-32 pb-[64px] px-[64px] grid grid-cols-4 md:grid-cols-12 gap-[24px] items-center relative">
        {/* Abstract Geometric Motif */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
          <svg width="100%" height="100%" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#c4c7c7" strokeWidth="1" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#c4c7c7" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="400" fill="none" stroke="#c4c7c7" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Asymmetric Content Block */}
        <div className="col-span-4 md:col-start-3 md:col-span-8 z-10 flex flex-col items-start gap-[48px] mt-[48px] md:mt-0">
          <div className="flex flex-col gap-6">
            <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-[#444748] uppercase">
              The Creator Economy
            </span>
            <h1 className="font-['Playfair_Display'] text-[80px] leading-[88px] tracking-[-0.04em] font-bold text-black md:-ml-8 relative">
              Turn Your Skill<br />
              Into Your<br />
              Business
            </h1>
            <p className="font-['Inter'] text-[18px] leading-[28px] tracking-[-0.01em] text-[#444748] max-w-lg mt-4 border-l border-[#c4c7c7]/50 pl-6">
              A rigorous, minimalist framework for transforming technical and creative expertise into a scalable enterprise. Designed for the focused professional.
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-[12px] w-full md:w-auto">
            <Link href="/register" className="group relative px-8 py-5 border border-black bg-[#f9f9f9]/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 hover:border-transparent inline-block">
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
              <span className="relative z-10 font-['Inter'] text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-black group-hover:text-white transition-colors duration-500 uppercase flex items-center gap-4">
                Get Started
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
              </span>
            </Link>
            <Link href="/login" className="font-['Inter'] text-[10px] leading-[12px] tracking-[0.05em] font-medium text-[#444748]/80 hover:text-black uppercase text-center w-full transition-colors duration-300">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicator Row */}
      <div className="w-full border-t border-[#c4c7c7]/30 bg-[#f9f9f9] py-8 px-[64px] z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#c4c7c7]/30 text-center md:text-left font-['Inter'] text-[10px] leading-[12px] tracking-[0.05em] font-medium text-[#444748] uppercase">
          <div className="pt-4 md:pt-0 md:pr-8 flex items-center justify-center md:justify-start gap-4">
            <span className="material-symbols-outlined text-[16px] opacity-60">check</span>
            Free to start
          </div>
          <div className="pt-4 md:pt-0 md:px-8 flex items-center justify-center md:justify-start gap-4">
            <span className="material-symbols-outlined text-[16px] opacity-60">school</span>
            No business degree needed
          </div>
          <div className="pt-4 md:pt-0 md:pl-8 flex items-center justify-center md:justify-start gap-4">
            <span className="material-symbols-outlined text-[16px] opacity-60">route</span>
            Step-by-step guidance
          </div>
        </div>
      </div>
    </div>
  );
}
