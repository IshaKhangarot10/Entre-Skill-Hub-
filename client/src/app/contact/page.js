'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thanks for reaching out! We will get back to you shortly.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        
        <div className="flex-1 flex flex-col gap-8">
          <header className="border-b border-[#c4c7c7]/30 pb-8">
            <Link href="/" className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-6 inline-flex items-center gap-2 hover:text-black transition-colors">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span> Back to Home
            </Link>
            <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mt-4">
              Get in touch
            </h1>
            <p className="font-['Inter'] text-[15px] text-[#444748] mt-6 leading-relaxed">
              Whether you have a question about our platform, need support with your mentorship sessions, or just want to say hello—our team is ready to answer all your questions.
            </p>
          </header>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] mb-1">Email</h3>
              <a href="mailto:hello@entreskill.com" className="font-['Playfair_Display'] text-[24px] text-black hover:underline decoration-1 underline-offset-4">hello@entreskill.com</a>
            </div>
            <div>
              <h3 className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] mb-1">Office</h3>
              <p className="font-['Inter'] text-[14px] text-black">100 Innovation Drive<br/>San Francisco, CA 94105</p>
            </div>
          </div>
        </div>

        <div className="flex-1 glass-panel p-8 md:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-black font-semibold">Name</label>
              <input type="text" id="name" required className="w-full bg-transparent border-b border-[#c4c7c7] py-3 text-[14px] font-['Inter'] text-black focus:outline-none focus:border-black transition-colors placeholder:text-[#c4c7c7]" placeholder="Jane Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-black font-semibold">Email</label>
              <input type="email" id="email" required className="w-full bg-transparent border-b border-[#c4c7c7] py-3 text-[14px] font-['Inter'] text-black focus:outline-none focus:border-black transition-colors placeholder:text-[#c4c7c7]" placeholder="jane@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-black font-semibold">Message</label>
              <textarea id="message" required rows="4" className="w-full bg-transparent border-b border-[#c4c7c7] py-3 text-[14px] font-['Inter'] text-black focus:outline-none focus:border-black transition-colors resize-none placeholder:text-[#c4c7c7]" placeholder="How can we help you?"></textarea>
            </div>
            
            <button type="submit" className="mt-4 w-full bg-black text-white font-['Inter'] text-[10px] tracking-[0.12em] font-semibold uppercase py-4 hover:bg-black/80 transition-colors">
              Send Message
            </button>
            
            {status && (
              <p className="text-[#28a745] font-['Inter'] text-[12px] text-center mt-4 bg-[#d4edda] py-2 px-4 border border-[#c3e6cb]">{status}</p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
