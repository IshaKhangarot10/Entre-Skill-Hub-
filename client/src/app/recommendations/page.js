'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function RecommendationsPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, toggleBookmark } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.post('/ideas/recommend', {});
        setIdeas(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchRecommendations();
  }, [user]);

  const handleBookmark = async (e, ideaId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleBookmark(ideaId);
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToRoadmap = async (ideaId) => {
    try {
      const res = await api.get(`/roadmaps/idea/${ideaId}`);
      if (res.data && res.data.roadmap) {
        router.push(`/roadmap/${res.data.roadmap._id}`);
      }
    } catch (err) {
      console.error('Roadmap not found for idea', err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">
              Analysis Complete
            </span>
            <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-tight tracking-[-0.02em] font-bold text-black">
              Your Curated Matches
            </h1>
            <p className="font-['Inter'] text-[16px] text-[#5e5e5e] max-w-2xl mt-4">
              Based on your skills, budget (${user?.budget?.toLocaleString()}), and goals, we recommend these micro-business models.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-[#c4c7c7] font-['Inter'] text-[10px] tracking-[0.05em] uppercase hover:border-black transition-colors">
              Filter
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, idx) => {
            const isBookmarked = user?.bookmarks?.includes(idea._id);
            const isTopMatch = idx === 0;

            return (
              <div 
                key={idea._id} 
                onClick={() => navigateToRoadmap(idea._id)}
                className={`glass-card p-8 flex flex-col relative cursor-pointer group ${
                  isTopMatch ? 'md:col-span-2 lg:col-span-2 bg-white' : ''
                }`}
              >
                {/* Match Score Badge */}
                <div className="absolute top-6 right-6 flex items-center justify-center w-12 h-12">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#e8e8e8" strokeWidth="2" />
                    <circle 
                      cx="24" cy="24" r="20" 
                      fill="none" stroke="#000" strokeWidth="2" 
                      strokeDasharray="125.6" 
                      strokeDashoffset={125.6 - (125.6 * idea.matchScore) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="font-['Inter'] text-[12px] font-bold">{idea.matchScore}%</span>
                </div>

                {isTopMatch && (
                  <div className="font-['Inter'] text-[10px] tracking-[0.05em] font-bold uppercase text-[#000] mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    Top Recommendation
                  </div>
                )}

                <div className="mt-4 mb-6">
                  <span className="material-symbols-outlined text-[32px] text-[#747878] mb-4 block icon-thin">
                    {idea.icon}
                  </span>
                  <h3 className={`font-['Playfair_Display'] ${isTopMatch ? 'text-[32px]' : 'text-[24px]'} font-semibold text-black leading-tight mb-2`}>
                    {idea.title}
                  </h3>
                  <p className="font-['Inter'] text-[14px] text-[#5e5e5e] line-clamp-3">
                    {idea.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {idea.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[#f3f3f4] text-[#444748] font-['Inter'] text-[9px] tracking-[0.05em] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex justify-between items-center border-t border-[#c4c7c7]/30 pt-4">
                  <div className="flex flex-col">
                    <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878]">Est. Cost</span>
                    <span className="font-['Inter'] text-[14px] font-medium text-black">${idea.costEstimate.min} - ${idea.costEstimate.max}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => handleBookmark(e, idea._id)}
                      className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                        isBookmarked ? 'bg-black border-black text-white' : 'border-[#c4c7c7] text-[#747878] hover:border-black'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}>
                        bookmark
                      </span>
                    </button>
                    <button className="w-10 h-10 bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
