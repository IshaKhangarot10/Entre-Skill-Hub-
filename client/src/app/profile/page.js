'use client';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8">
          <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mb-4">
            User Profile
          </h1>
          <p className="font-['Inter'] text-[16px] text-[#5e5e5e]">
            Manage your account details and preferences.
          </p>
        </header>

        <div className="glass-panel p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#747878] mb-4">Personal Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase text-[#c4c7c7] block mb-1">Name</label>
                  <div className="text-[16px] font-medium">{user?.name || 'Loading...'}</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#c4c7c7] block mb-1">Email</label>
                  <div className="text-[16px] font-medium">{user?.email || 'Loading...'}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#747878] mb-4">Onboarding Data</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase text-[#c4c7c7] block mb-1">Goal</label>
                  <div className="text-[14px]">{user?.goal || 'Not set'}</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#c4c7c7] block mb-1">Budget</label>
                  <div className="text-[14px]">${user?.budget?.toLocaleString() || '0'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#c4c7c7]/30">
            <button className="px-6 py-3 border border-black font-['Inter'] text-[11px] font-semibold uppercase hover:bg-black hover:text-white transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
