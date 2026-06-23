'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
        if (user?.skills) {
          setSelectedSkills(user.skills.map(s => s._id || s));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [user]);

  const toggleSkill = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter(s => s !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const handleNext = async () => {
    if (selectedSkills.length === 0) return;
    try {
      await updateProfile({ skills: selectedSkills });
      router.push('/onboarding/interests');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><div className="loading-spinner"></div></div>;

  return (
    <div className="glass-panel p-8 md:p-12 shadow-studio relative overflow-hidden">
      {/* Progress indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#e8e8e8]">
        <div className="h-full bg-black w-1/3 transition-all duration-500"></div>
      </div>

      <div className="flex justify-between items-center mb-12">
        <div>
          <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">Step 01 / 03</span>
          <h1 className="font-['Playfair_Display'] text-[32px] md:text-[48px] leading-tight tracking-[-0.02em] font-semibold text-black">
            What are your existing skills?
          </h1>
        </div>
        <div className="hidden md:flex gap-1">
          <div className="w-12 h-1 bg-black"></div>
          <div className="w-12 h-1 bg-[#e8e8e8]"></div>
          <div className="w-12 h-1 bg-[#e8e8e8]"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {skills.map(skill => (
          <button
            key={skill._id}
            onClick={() => toggleSkill(skill._id)}
            className={`skill-card p-6 flex flex-col items-center justify-center gap-4 border ${
              selectedSkills.includes(skill._id)
                ? 'bg-black text-white border-black'
                : 'bg-white/50 text-[#5e5e5e] border-[#c4c7c7] hover:border-black'
            }`}
          >
            <span className="material-symbols-outlined text-[32px] icon-thin">
              {skill.icon || 'build'}
            </span>
            <span className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-center">
              {skill.name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-[#c4c7c7]/30 pt-8">
        <p className="font-['Inter'] text-[11px] text-[#747878]">
          Select all that apply. <br className="md:hidden" />This helps us match you with the right business ideas.
        </p>
        <button
          onClick={handleNext}
          disabled={selectedSkills.length === 0}
          className="bg-black text-white px-8 py-4 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          Continue
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
