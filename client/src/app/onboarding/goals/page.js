'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function GoalsPage() {
  const [timeCommitment, setTimeCommitment] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.timeCommitment) setTimeCommitment(user.timeCommitment);
    if (user?.goal) setGoal(user.goal);
  }, [user]);

  const handleComplete = async () => {
    if (!timeCommitment || !goal) return;
    setLoading(true);
    try {
      await updateProfile({ 
        timeCommitment, 
        goal,
        onboardingComplete: true 
      });
      router.push('/recommendations');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const timeOptions = [
    { id: '0-5', label: '0-5 Hours', desc: 'Weekend side hustle' },
    { id: '5-15', label: '5-15 Hours', desc: 'Part-time commitment' },
    { id: '15+', label: '15+ Hours', desc: 'Primary focus' }
  ];

  const goalOptions = [
    { id: 'extra-income', label: 'Extra Income', desc: 'Supplement my current job', icon: 'savings' },
    { id: 'replace-job', label: 'Replace Job', desc: 'Transition to full-time entrepreneur', icon: 'flight_takeoff' },
    { id: 'build-big', label: 'Build Big', desc: 'Create a scalable enterprise', icon: 'domain' }
  ];

  return (
    <div className="glass-panel p-8 md:p-12 shadow-studio relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#e8e8e8]">
        <div className="h-full bg-black w-full transition-all duration-500"></div>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div>
          <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">Step 03 / 03</span>
          <h1 className="font-['Playfair_Display'] text-[32px] md:text-[48px] leading-tight tracking-[-0.02em] font-semibold text-black">
            Time & Objectives
          </h1>
        </div>
        <div className="hidden md:flex gap-1">
          <div className="w-12 h-1 bg-black"></div>
          <div className="w-12 h-1 bg-black"></div>
          <div className="w-12 h-1 bg-black"></div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase mb-6 text-black">Weekly Time Commitment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setTimeCommitment(option.id)}
              className={`p-6 border text-center transition-all ${
                timeCommitment === option.id
                  ? 'border-black bg-black text-white'
                  : 'border-[#c4c7c7] bg-white hover:border-black text-black'
              }`}
            >
              <div className={`font-['Playfair_Display'] text-[24px] font-semibold mb-2 ${
                timeCommitment === option.id ? 'text-white' : 'text-black'
              }`}>
                {option.label}
              </div>
              <div className={`font-['Inter'] text-[12px] ${
                timeCommitment === option.id ? 'text-[#c4c7c7]' : 'text-[#747878]'
              }`}>
                {option.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase mb-6 text-black">Primary Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goalOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setGoal(option.id)}
              className={`p-6 border text-left transition-all ${
                goal === option.id
                  ? 'border-black bg-white shadow-studio'
                  : 'border-[#c4c7c7] bg-transparent hover:border-black'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] mb-4 ${
                goal === option.id ? 'text-black' : 'text-[#747878]'
              }`}>
                {option.icon}
              </span>
              <div className="font-['Inter'] text-[14px] font-semibold mb-1 text-black">
                {option.label}
              </div>
              <div className="font-['Inter'] text-[12px] text-[#747878]">
                {option.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-[#c4c7c7]/30 pt-8">
        <button
          onClick={() => router.back()}
          className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-[#747878] hover:text-black flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back
        </button>
        <button
          onClick={handleComplete}
          disabled={!timeCommitment || !goal || loading}
          className="bg-black text-white px-8 py-4 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'View Matches'}
          {!loading && <span className="material-symbols-outlined text-[16px]">magic_button</span>}
        </button>
      </div>
    </div>
  );
}
