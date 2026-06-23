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
    <div className="bg-[#ffffff] text-[#000000] min-h-screen flex flex-col font-['Inter'] selection:bg-black selection:text-white">
      
      {/* Avant-garde Hero Section */}
      <div className="flex-grow flex flex-col justify-center px-[24px] md:px-[120px] pt-[120px] pb-[80px] relative">
        
        {/* Decorative thin lines for alignment motif */}
        <div className="absolute top-0 left-[120px] w-[1px] h-full bg-[#e5e5e5] hidden md:block"></div>
        <div className="absolute top-0 right-[120px] w-[1px] h-full bg-[#e5e5e5] hidden md:block"></div>
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-[#e5e5e5] hidden lg:block mix-blend-multiply opacity-50"></div>

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-[64px]">
          
          {/* Header Bar */}
          <div className="flex justify-between items-end border-b border-black pb-8">
             <span className="font-['Inter'] text-[10px] tracking-[0.2em] font-medium uppercase text-black">
               The Blueprint for Creators
             </span>
             <span className="font-['Inter'] text-[10px] tracking-[0.2em] font-medium uppercase text-black hidden md:block">
               Est. 2026
             </span>
          </div>

          {/* Massive Typography Hero */}
          <h1 className="font-['Playfair_Display'] text-[64px] md:text-[120px] lg:text-[140px] leading-[0.85] tracking-[-0.04em] font-black text-black uppercase">
            Transform <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Raw Skill</span> <br/>
            Into Scale.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8 md:mt-16">
            <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
              <p className="font-['Inter'] text-[16px] md:text-[18px] leading-[1.6] tracking-[-0.01em] text-[#000000] font-light">
                EntreSkill is a rigorous, minimalist framework designed for the focused professional. We provide the architecture to turn your technical and creative expertise into a sustainable enterprise.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <Link href="/register" className="group relative px-10 py-5 bg-black text-white overflow-hidden inline-flex justify-center items-center">
                  <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                  <span className="relative z-10 font-['Inter'] text-[11px] tracking-[0.2em] font-bold uppercase group-hover:text-black transition-colors duration-500 flex items-center gap-4">
                    Begin Journey
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">east</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-span-1 md:col-start-8 md:col-span-5 grid grid-cols-2 gap-8 border-l border-[#e5e5e5] pl-8 md:pl-12">
               <div className="flex flex-col gap-4">
                 <span className="font-['Playfair_Display'] text-[40px] leading-none text-black">01</span>
                 <span className="font-['Inter'] text-[10px] tracking-[0.1em] font-bold uppercase text-black">Curated Matches</span>
                 <p className="font-['Inter'] text-[12px] text-[#5e5e5e] leading-relaxed">Algorithmically selected business models based on your exact profile.</p>
               </div>
               <div className="flex flex-col gap-4">
                 <span className="font-['Playfair_Display'] text-[40px] leading-none text-black">02</span>
                 <span className="font-['Inter'] text-[10px] tracking-[0.1em] font-bold uppercase text-black">Execution</span>
                 <p className="font-['Inter'] text-[12px] text-[#5e5e5e] leading-relaxed">Rigorous, step-by-step roadmaps that eliminate guesswork.</p>
               </div>
               <div className="flex flex-col gap-4">
                 <span className="font-['Playfair_Display'] text-[40px] leading-none text-black">03</span>
                 <span className="font-['Inter'] text-[10px] tracking-[0.1em] font-bold uppercase text-black">Mentorship</span>
                 <p className="font-['Inter'] text-[12px] text-[#5e5e5e] leading-relaxed">Direct access to industry veterans who have scaled successfully.</p>
               </div>
               <div className="flex flex-col justify-end">
                 <Link href="/login" className="font-['Inter'] text-[10px] tracking-[0.1em] font-bold uppercase text-black hover:opacity-50 transition-opacity flex items-center gap-2 border-b border-black pb-1 inline-flex w-max">
                   Sign In Existing <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                 </Link>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
