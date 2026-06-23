export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 border-b border-[#c4c7c7]/30 pb-8">
          <h1 className="font-['Playfair_Display'] text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mb-6">
            How SkillSpark Works
          </h1>
          <p className="font-['Inter'] text-[18px] text-[#5e5e5e] max-w-2xl">
            We bridge the gap between your existing skills and a sustainable micro-business. Our structured framework takes you from raw talent to market-ready enterprise.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8">
            <div className="font-['Playfair_Display'] text-[32px] text-black mb-4">01. Match</div>
            <p className="text-[14px] text-[#5e5e5e]">We analyze your skills, budget, and time constraints to recommend highly viable business models tailored to your profile.</p>
          </div>
          <div className="glass-panel p-8">
            <div className="font-['Playfair_Display'] text-[32px] text-black mb-4">02. Execute</div>
            <p className="text-[14px] text-[#5e5e5e]">Follow our rigorous, step-by-step roadmaps. Access curated video modules, checklists, and templates to launch with confidence.</p>
          </div>
          <div className="glass-panel p-8">
            <div className="font-['Playfair_Display'] text-[32px] text-black mb-4">03. Scale</div>
            <p className="text-[14px] text-[#5e5e5e]">Connect with experienced mentors who provide targeted feedback and guidance to help you grow your new business.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
