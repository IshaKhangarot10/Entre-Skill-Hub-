export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 border-b border-[#c4c7c7]/30 pb-8 text-center">
          <h1 className="font-['Playfair_Display'] text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mb-6">
            Our Mentors
          </h1>
          <p className="font-['Inter'] text-[18px] text-[#5e5e5e] max-w-2xl mx-auto">
            Connect with seasoned professionals who have already built what you're trying to build.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Mentor Card */}
          <div className="glass-panel p-8 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#e8e8e8] mb-6 flex items-center justify-center font-['Playfair_Display'] text-[32px] text-[#747878]">
              EM
            </div>
            <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-2">Eleanor Masters</h3>
            <p className="text-[12px] text-[#747878] uppercase tracking-[0.05em] mb-4">Tech & Design</p>
            <p className="text-[14px] text-[#5e5e5e] mb-6">8 years in tech startups and freelancing. Passionate about helping aspiring entrepreneurs build sustainable businesses.</p>
            <button className="px-6 py-2 border border-black text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-black hover:text-white transition-colors">
              View Profile
            </button>
          </div>
          
          <div className="glass-panel p-8 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#e8e8e8] mb-6 flex items-center justify-center font-['Playfair_Display'] text-[32px] text-[#747878]">
              JD
            </div>
            <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-2">James Doe</h3>
            <p className="text-[12px] text-[#747878] uppercase tracking-[0.05em] mb-4">E-Commerce</p>
            <p className="text-[14px] text-[#5e5e5e] mb-6">Grew multiple online stores to 6-figures. Specializes in supply chain and digital marketing strategies.</p>
            <button className="px-6 py-2 border border-black text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-black hover:text-white transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
