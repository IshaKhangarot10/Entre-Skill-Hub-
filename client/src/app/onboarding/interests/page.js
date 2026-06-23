'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function InterestsPage() {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(true);
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await api.get('/interests');
        setInterests(res.data);
        if (user?.interests) {
          setSelectedInterests(user.interests.map(i => i._id || i));
        }
        if (user?.budget) setBudget(user.budget);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, [user]);

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleNext = async () => {
    if (selectedInterests.length === 0) return;
    try {
      await updateProfile({ interests: selectedInterests, budget });
      router.push('/onboarding/goals');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><div className="loading-spinner"></div></div>;

  return (
    <div className="glass-panel p-8 md:p-12 shadow-studio relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#e8e8e8]">
        <div className="h-full bg-black w-2/3 transition-all duration-500"></div>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div>
          <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">Step 02 / 03</span>
          <h1 className="font-['Playfair_Display'] text-[32px] md:text-[48px] leading-tight tracking-[-0.02em] font-semibold text-black">
            Preferences & Budget
          </h1>
        </div>
        <div className="hidden md:flex gap-1">
          <div className="w-12 h-1 bg-black"></div>
          <div className="w-12 h-1 bg-black"></div>
          <div className="w-12 h-1 bg-[#e8e8e8]"></div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase mb-6 text-black">Business Model Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interests.map(interest => (
            <button
              key={interest._id}
              onClick={() => toggleInterest(interest._id)}
              className={`text-left p-6 flex items-start gap-4 border transition-all ${
                selectedInterests.includes(interest._id)
                  ? 'border-black bg-white shadow-sm'
                  : 'border-[#e2e2e2] hover:border-[#c4c7c7] bg-transparent'
              }`}
            >
              <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                selectedInterests.includes(interest._id) ? 'border-black bg-black' : 'border-[#c4c7c7]'
              }`}>
                {selectedInterests.includes(interest._id) && <span className="material-symbols-outlined text-white text-[12px]">check</span>}
              </div>
              <div>
                <div className="font-['Inter'] text-[14px] font-medium text-black mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] opacity-70 icon-thin">{interest.icon || 'interests'}</span>
                  {interest.name}
                </div>
                <div className="font-['Inter'] text-[12px] text-[#747878] leading-relaxed">
                  {interest.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-black">Initial Budget Estimate</h3>
          <div className="font-['Playfair_Display'] text-[32px] text-black">${budget.toLocaleString()}</div>
        </div>
        <div className="relative pt-4 pb-8">
          <input
            type="range"
            min="0"
            max="20000"
            step="500"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-1 bg-[#e8e8e8] appearance-none outline-none slider-thumb"
            style={{
              background: `linear-gradient(to right, #000 0%, #000 ${(budget/20000)*100}%, #e8e8e8 ${(budget/20000)*100}%, #e8e8e8 100%)`
            }}
          />
          <div className="flex justify-between mt-4 font-['Inter'] text-[10px] font-medium text-[#747878]">
            <span>$0</span>
            <span>$10k</span>
            <span>$20k+</span>
          </div>
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
          onClick={handleNext}
          disabled={selectedInterests.length === 0}
          className="bg-black text-white px-8 py-4 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          Continue
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
