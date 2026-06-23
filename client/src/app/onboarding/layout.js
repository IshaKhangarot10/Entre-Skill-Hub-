import Link from 'next/link';

export default function OnboardingLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] flex flex-col">
      <header className="flex-none p-[24px] md:px-[64px] flex justify-between items-center z-50">
        <Link href="/" className="font-['Playfair_Display'] text-[24px] md:text-[32px] tracking-[-0.02em] font-semibold text-black">
          SKILLSPARK
        </Link>
        <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">
          Onboarding
        </span>
      </header>
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-[#e2e2e2]/30 rotate-12 blur-3xl rounded-full z-0 pointer-events-none"></div>
        <div className="w-full max-w-4xl px-[24px] relative z-10 py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
