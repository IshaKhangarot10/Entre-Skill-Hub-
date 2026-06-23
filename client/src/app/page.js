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
    <div className="bg-[#ffffff] text-[#111111] min-h-screen flex flex-col font-['Inter'] selection:bg-[#111111] selection:text-white">
      
      {/* Luxury Editorial Hero Section */}
      <div className="flex-grow flex flex-col justify-center px-[24px] md:px-[64px] lg:px-[120px] pt-[160px] pb-[120px]">
        
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center gap-[48px]">
          
          <div className="border-b border-[#e5e5e5] pb-6 w-full flex justify-center">
             <span className="font-['Inter'] text-[10px] tracking-[0.25em] font-medium uppercase text-[#646464]">
               The Blueprint for Creators
             </span>
          </div>

          {/* Elegant Typography Hero */}
          <h1 className="font-['Playfair_Display'] text-[48px] md:text-[72px] lg:text-[88px] leading-[1.15] tracking-[-0.01em] font-medium text-[#111111]">
            Transform Raw Skill<br className="hidden md:block" />
            Into Scale.
          </h1>

          <p className="font-['Inter'] text-[16px] md:text-[18px] leading-[1.8] text-[#646464] font-light max-w-2xl mt-4">
            EntreSkill is a rigorous, minimalist framework designed for the focused professional. We provide the architecture to turn your technical and creative expertise into a sustainable enterprise.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center">
            <Link href="/register" className="group px-12 py-4 bg-[#111111] text-white font-['Inter'] text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-black transition-colors flex items-center gap-4">
              Begin Journey
              <span className="material-symbols-outlined text-[16px] font-light group-hover:translate-x-1 transition-transform duration-300">east</span>
            </Link>
            <Link href="/login" className="font-['Inter'] text-[11px] tracking-[0.1em] font-medium uppercase text-[#646464] hover:text-[#111111] transition-colors border-b border-transparent hover:border-[#111111] pb-1">
              Sign In Existing
            </Link>
          </div>

        </div>

        {/* Feature grid */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-16 mt-[120px] pt-[80px] border-t border-[#e5e5e5]">
           <div className="flex flex-col items-center text-center gap-4">
             <span className="font-['Playfair_Display'] text-[24px] text-[#111111] mb-2 italic">01.</span>
             <span className="font-['Inter'] text-[11px] tracking-[0.15em] font-medium uppercase text-[#111111]">Curated Matches</span>
             <p className="font-['Inter'] text-[14px] text-[#646464] leading-relaxed max-w-xs">Algorithmically selected business models based on your exact profile.</p>
           </div>
           <div className="flex flex-col items-center text-center gap-4">
             <span className="font-['Playfair_Display'] text-[24px] text-[#111111] mb-2 italic">02.</span>
             <span className="font-['Inter'] text-[11px] tracking-[0.15em] font-medium uppercase text-[#111111]">Execution</span>
             <p className="font-['Inter'] text-[14px] text-[#646464] leading-relaxed max-w-xs">Rigorous, step-by-step roadmaps that eliminate guesswork.</p>
           </div>
           <div className="flex flex-col items-center text-center gap-4">
             <span className="font-['Playfair_Display'] text-[24px] text-[#111111] mb-2 italic">03.</span>
             <span className="font-['Inter'] text-[11px] tracking-[0.15em] font-medium uppercase text-[#111111]">Mentorship</span>
             <p className="font-['Inter'] text-[14px] text-[#646464] leading-relaxed max-w-xs">Direct access to industry veterans who have scaled successfully.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
