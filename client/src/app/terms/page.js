'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="border-b border-[#c4c7c7]/30 pb-8">
          <Link href="/" className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-6 inline-flex items-center gap-2 hover:text-black transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span> Back to Home
          </Link>
          <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mt-4">
            Terms of Service
          </h1>
          <p className="font-['Inter'] text-[14px] text-[#747878] mt-4">Effective Date: October 2026</p>
        </header>

        <section className="flex flex-col gap-8 prose prose-neutral max-w-none">
          <div>
            <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#444748] text-[15px] leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </div>

          <div>
            <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-4">2. Intellectual Property Rights</h2>
            <p className="text-[#444748] text-[15px] leading-relaxed">
              The Site and its original content, features, and functionality are owned by EntreSkill and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </div>

          <div>
            <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-4">3. User Conduct</h2>
            <p className="text-[#444748] text-[15px] leading-relaxed">
              You agree not to use the platform for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the platform in any way that could damage the platform, the services, or the general business of EntreSkill.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
