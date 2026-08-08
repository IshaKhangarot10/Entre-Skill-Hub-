'use client';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="border-b border-[#c4c7c7]/30 pb-8">
          <Link href="/" className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-6 inline-flex items-center gap-2 hover:text-black transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span> Back to Home
          </Link>
          <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mt-4">
            Privacy Policy
          </h1>
          <p className="font-['Inter'] text-[14px] text-[#747878] mt-4">Effective Date: October 2026</p>
        </header>

        <section className="flex flex-col gap-8 prose prose-neutral max-w-none">
          <div>
            <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-4">1. Information We Collect</h2>
            <p className="text-[#444748] text-[15px] leading-relaxed">
              We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, delivery notes, and other information you choose to provide.
            </p>
          </div>

          <div>
            <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-4">2. Use of Information</h2>
            <p className="text-[#444748] text-[15px] leading-relaxed">
              We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support, and send updates and administrative messages.
            </p>
          </div>

          <div>
            <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-4">3. Sharing of Information</h2>
            <p className="text-[#444748] text-[15px] leading-relaxed">
              We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: with third party service providers who need access to such information to carry out work on our behalf.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
