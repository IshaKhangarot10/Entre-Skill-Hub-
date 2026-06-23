'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function ProgressDashboardPage() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/progress');
        setProgressData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboard();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-6xl mx-auto flex flex-col gap-[48px]">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#c4c7c7]/30 pb-8">
          <div>
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">
              SkillSpark Profile
            </span>
            <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
              {user?.name?.split(' ')[0]}&apos;s Dashboard
            </h1>
          </div>
          <Link href="/recommendations" className="px-6 py-3 border border-black font-['Inter'] text-[10px] tracking-[0.12em] font-semibold uppercase hover:bg-black hover:text-white transition-colors">
            Explore New Ideas
          </Link>
        </header>

        {/* High-level Stats (Bento Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-48">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">Active Roadmaps</span>
            <div className="font-['Playfair_Display'] text-[64px] leading-none text-black">
              {progressData.length > 0 ? progressData.length : '0'}
            </div>
          </div>
          <div className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-48">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">Total Time Invested</span>
            <div className="font-['Playfair_Display'] text-[64px] leading-none text-black flex items-baseline gap-2">
              {progressData.reduce((acc, curr) => acc + (curr.hoursInvested || 0), 0)}<span className="text-[24px] text-[#747878]">hrs</span>
            </div>
          </div>
          <div className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-48 bg-black text-white">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#c4c7c7]">Next Mentorship Session</span>
            <div className="mt-auto">
              <div className="font-['Playfair_Display'] text-[24px] font-semibold mb-1">Portfolio Review</div>
              <div className="font-['Inter'] text-[12px] text-[#e8e8e8]">Tomorrow, 14:00</div>
            </div>
          </div>
        </section>

        {/* Active Pursuits */}
        <section className="flex flex-col gap-6">
          <h2 className="font-['Inter'] text-[14px] tracking-[0.12em] font-semibold uppercase text-black hairline-b pb-4">
            Active Pursuits
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {progressData.length === 0 ? (
              <div className="glass-panel p-12 text-center text-[#747878]">
                You haven&apos;t started any roadmaps yet. <Link href="/recommendations" className="text-black underline">Explore ideas to get started.</Link>
              </div>
            ) : (
              progressData.map(progress => (
                <div key={progress._id} className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="material-symbols-outlined text-[24px] icon-thin">
                        {progress.businessIdeaId?.icon || 'flag'}
                      </span>
                      <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-black">
                        {progress.roadmapId?.title || 'Unknown Roadmap'}
                      </h3>
                    </div>
                    <div className="flex gap-6 font-['Inter'] text-[12px] text-[#5e5e5e]">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">checklist</span> {progress.completedSteps.length} Steps Done</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> Last active: {new Date(progress.lastAccessedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-6">
                    {/* Minimal Circular Progress */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#e8e8e8" strokeWidth="4" />
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#000" strokeWidth="4" 
                          strokeDasharray="175.9" 
                          strokeDashoffset={175.9 - (175.9 * progress.percentComplete) / 100}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute font-['Inter'] text-[12px] font-bold">{progress.percentComplete}%</span>
                    </div>
                    
                    <Link href={`/roadmap/${progress.roadmapId?._id}`} className="w-full md:w-auto px-6 py-3 border border-[#c4c7c7] text-center font-['Inter'] text-[10px] tracking-[0.12em] font-semibold uppercase hover:border-black transition-colors">
                      Resume
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Saved Ideas / Bookmarks */}
        <section className="flex flex-col gap-6 mt-8">
          <h2 className="font-['Inter'] text-[14px] tracking-[0.12em] font-semibold uppercase text-black hairline-b pb-4">
            Saved Ideas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.bookmarks?.length > 0 ? (
              user.bookmarks.map(idea => (
                <div key={idea._id || idea} className="glass-panel p-6">
                   <h3 className="font-['Playfair_Display'] text-[20px] font-semibold text-black mb-2">Saved Business Idea</h3>
                   <Link href={`/recommendations`} className="font-['Inter'] text-[12px] text-[#5e5e5e] hover:text-black underline">View in Recommendations</Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-[#747878] font-['Inter'] text-[12px]">No ideas bookmarked yet.</div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
