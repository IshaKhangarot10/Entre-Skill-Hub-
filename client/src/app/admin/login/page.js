'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        router.push('/admin/analytics');
      } else {
        setError('Unauthorized access. Admin privileges required.');
        // logout user since they are not admin
      }
    } catch (err) {
      setError('Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Mock 2FA segments (visual only, per plan)
  const otpInputs = Array(6).fill('');

  return (
    <div className="bg-[#ffffff] text-[#1a1c1c] min-h-screen flex flex-col items-center justify-center font-['Inter'] antialiased overflow-hidden selection:bg-[#1c1b1b] selection:text-[#858383] relative">
      {/* Ambient background element for depth */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <main className="w-full max-w-md px-[24px] relative z-10">
        
        {/* Brand Anchor */}
        <div className="text-center mb-[48px]">
          <h1 className="font-['Inter'] text-[11px] tracking-[0.2em] font-semibold uppercase text-[#444748]">
            SKILLSPARK
          </h1>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-[4px] p-[64px] relative overflow-hidden bg-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-[#E5E5E5]">
          {/* Subtle inner bevel effect */}
          <div className="absolute inset-0 border-t border-l border-white/50 rounded-[4px] pointer-events-none"></div>
          
          <div className="mb-[24px]">
            <h2 className="font-['Playfair_Display'] text-[32px] md:text-[48px] leading-tight tracking-[-0.02em] font-semibold text-black text-center">
              Admin Access
            </h2>
          </div>

          {error && <div className="mb-4 text-center text-[12px] text-[#ba1a1a]">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-[48px]">
            <div className="space-y-[12px]">
              <label className="block font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#444748]" htmlFor="email">
                Email Address
              </label>
              <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} 
                     className="input-line w-full py-2 font-['Inter'] text-[16px] text-black placeholder:text-transparent focus:ring-0" placeholder="admin@skillspark.io" />
            </div>

            <div className="space-y-[12px]">
              <label className="block font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#444748]" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)}
                     className="input-line w-full py-2 font-['Inter'] text-[16px] text-black placeholder:text-transparent focus:ring-0" placeholder="••••••••" />
            </div>

            {/* 2FA Segments (Visual Only) */}
            <div className="space-y-[12px] pt-4 border-t border-[#c4c7c7]/30">
              <label className="block font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#444748] text-center">
                Two-Factor Authentication
              </label>
              <div className="flex justify-between gap-2 items-center">
                {otpInputs.slice(0,3).map((_, i) => <input key={i} type="text" maxLength={1} className="w-10 h-12 text-center border border-[#c4c7c7] bg-transparent font-['Inter'] text-[18px] font-medium focus:outline-none focus:border-black focus:border-2 rounded-[2px]" />)}
                <span className="text-[#c4c7c7]">-</span>
                {otpInputs.slice(3,6).map((_, i) => <input key={i+3} type="text" maxLength={1} className="w-10 h-12 text-center border border-[#c4c7c7] bg-transparent font-['Inter'] text-[18px] font-medium focus:outline-none focus:border-black focus:border-2 rounded-[2px]" />)}
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase flex justify-center items-center gap-2 group hover:scale-[1.02] transition-transform duration-200 rounded-[2px] disabled:opacity-50">
                {loading ? 'Authenticating...' : 'Sign In'}
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform icon-thin">arrow_forward</span>
              </button>
            </div>
            
            {/* Demo Button for testing */}
            <div className="text-center">
              <button type="button" onClick={() => { setEmail('admin@skillspark.io'); setPassword('admin123'); }} className="text-[#747878] text-[10px] hover:text-black underline uppercase tracking-[0.05em]">Load Demo Credentials</button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-[48px] text-center">
          <p className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">
            Authorized personnel only
          </p>
        </div>

      </main>
    </div>
  );
}
