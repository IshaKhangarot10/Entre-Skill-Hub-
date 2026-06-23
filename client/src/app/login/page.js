'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      if (user.role === 'admin') router.push('/admin/analytics');
      else if (user.role === 'mentor') router.push('/mentor/dashboard');
      else if (user.onboardingComplete) router.push('/dashboard');
      else router.push('/onboarding/skills');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-['Inter']">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[64px] py-6">
        <Link href="/" className="font-['Playfair_Display'] text-[48px] leading-[52px] tracking-[-0.02em] font-semibold text-black">SKILLSPARK</Link>
        <Link href="/register" className="text-[11px] tracking-[0.12em] font-semibold uppercase text-[#444748]/60 hover:text-black transition-colors">SIGN UP</Link>
      </header>

      <main className="min-h-screen flex items-center justify-center px-[64px] py-[120px] relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] bg-[#e2e2e2]/20 rotate-12 blur-3xl rounded-full z-0 pointer-events-none"></div>
        
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-center z-10 relative">
          <div className="col-span-1 lg:col-span-5 lg:col-start-2 hidden md:block">
            <h1 className="font-['Playfair_Display'] text-[80px] leading-[88px] tracking-[-0.04em] font-bold text-black">WELCOME<br/>BACK</h1>
            <p className="font-['Inter'] text-[18px] leading-[28px] tracking-[-0.01em] text-[#5e5e5e] mt-[12px] max-w-md">Continue your journey toward building a sustainable micro-enterprise.</p>
          </div>

          <div className="col-span-1 lg:col-span-5 lg:col-start-8 w-full max-w-md mx-auto">
            <div className="glass-panel shadow-studio p-8 lg:p-12">
              <h2 className="font-['Playfair_Display'] text-[32px] leading-[36px] tracking-[-0.01em] font-semibold text-black mb-8 md:hidden">SIGN IN</h2>

              {error && (
                <div className="mb-6 p-3 bg-[#ffdad6] text-[#93000a] text-[12px] rounded">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="form-group">
                  <input type="email" id="email" placeholder="EMAIL" required value={email} onChange={e => setEmail(e.target.value)} className="input-line w-full py-2 text-[16px] text-black" />
                  <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase" htmlFor="email">EMAIL ADDRESS</label>
                </div>

                <div className="form-group">
                  <input type={showPassword ? 'text' : 'password'} id="password" placeholder="PASSWORD" required value={password} onChange={e => setPassword(e.target.value)} className="input-line w-full py-2 text-[16px] text-black" />
                  <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase" htmlFor="password">PASSWORD</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-2 text-[#747878] hover:text-black transition-colors">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase py-4 mt-[12px] hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50">
                  {loading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>

                <p className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium text-[#5e5e5e] text-center mt-4">
                  DON&apos;T HAVE AN ACCOUNT? <Link href="/register" className="text-black hover:underline underline-offset-4">SIGN UP</Link>
                </p>
              </form>

              {/* Demo credentials */}
              <div className="mt-8 pt-6 border-t border-[#c4c7c7]/30">
                <p className="text-[10px] tracking-[0.05em] font-medium text-[#444748] uppercase mb-3">Demo Accounts</p>
                <div className="space-y-2 text-[11px] text-[#5e5e5e]">
                  <button onClick={() => { setEmail('user@skillspark.io'); setPassword('user123'); }} className="block hover:text-black transition-colors">User: user@skillspark.io</button>
                  <button onClick={() => { setEmail('mentor@skillspark.io'); setPassword('mentor123'); }} className="block hover:text-black transition-colors">Mentor: mentor@skillspark.io</button>
                  <button onClick={() => { setEmail('admin@skillspark.io'); setPassword('admin123'); }} className="block hover:text-black transition-colors">Admin: admin@skillspark.io</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
