'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function RoadmapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await api.get(`/roadmaps/${params.id}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchRoadmap();
  }, [params.id, user]);

  const handleStepComplete = async (e, stepId) => {
    e.stopPropagation();
    try {
      const res = await api.post('/progress/complete', {
        roadmapId: data.roadmap._id,
        stepId
      });
      setData({ ...data, progress: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;
  if (!data || !data.roadmap) return <div className="min-h-screen pt-32 text-center">Roadmap not found</div>;

  const { roadmap, steps, progress } = data;
  const idea = roadmap.businessIdeaId;
  const completedStepIds = progress?.completedSteps || [];
  const percentComplete = progress?.percentComplete || 0;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto flex flex-col gap-[48px]">
        
        {/* Header Unit */}
        <header className="flex flex-col gap-[24px]">
          <Link href="/recommendations" className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] hover:text-black flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to Recommendations
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c7c7]/30 pb-8">
            <div className="max-w-2xl">
              <div className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold text-black uppercase mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">{idea?.icon || 'map'}</span>
                {idea?.title}
              </div>
              <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
                {roadmap.title}
              </h1>
              <p className="font-['Inter'] text-[16px] leading-[24px] text-[#5e5e5e] mt-4">
                {roadmap.description}
              </p>
            </div>
            
            <div className="glass-panel px-6 py-4 flex flex-col items-end min-w-[160px]">
              <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-1">Completion</span>
              <div className="font-['Playfair_Display'] text-[32px] font-semibold text-black">
                {percentComplete}%
              </div>
              <div className="w-full h-1 bg-[#e8e8e8] mt-2">
                <div className="h-full bg-black transition-all duration-1000" style={{ width: `${percentComplete}%` }}></div>
              </div>
            </div>
          </div>
        </header>

        {/* Vertical Timeline */}
        <div className="relative pl-[32px] md:pl-[64px] border-l border-[#c4c7c7]/30">
          
          {steps.map((step, index) => {
            const isCompleted = completedStepIds.includes(step._id);
            const isNext = !isCompleted && (index === 0 || completedStepIds.includes(steps[index - 1]._id));
            const isLocked = !isCompleted && !isNext;
            
            return (
              <div key={step._id} className="relative mb-[48px] last:mb-0 group">
                
                {/* Timeline Node */}
                <div className={`absolute left-[-32px] md:left-[-64px] top-0 w-8 h-8 -translate-x-1/2 flex items-center justify-center bg-[#f9f9f9] border-2 transition-colors duration-300 ${
                  isCompleted ? 'border-black' : isNext ? 'border-[#5e5e5e] border-dashed' : 'border-[#c4c7c7]'
                }`}>
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[16px] text-black">check</span>
                  ) : (
                    <span className={`font-['Inter'] text-[10px] font-medium ${isNext ? 'text-[#5e5e5e]' : 'text-[#c4c7c7]'}`}>
                      0{index + 1}
                    </span>
                  )}
                </div>

                {/* Step Card */}
                <div className={`glass-card p-6 md:p-8 transition-all duration-300 ${
                  isCompleted ? 'opacity-70' : isLocked ? 'opacity-40 grayscale' : 'hover:-translate-y-1 shadow-studio'
                }`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-black">
                      {step.title}
                    </h3>
                    <div className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {step.estimatedDuration}
                    </div>
                  </div>
                  
                  <p className="font-['Inter'] text-[14px] text-[#5e5e5e] mb-6">
                    {step.content}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 border-t border-[#c4c7c7]/30 pt-4">
                    {!isLocked && (
                      <Link href={`/roadmap/${roadmap._id}/step/${step._id}`} className="px-6 py-3 bg-black text-white font-['Inter'] text-[10px] tracking-[0.12em] font-semibold uppercase hover:bg-[#333] transition-colors">
                        {isCompleted ? 'Review Material' : 'Start Module'}
                      </Link>
                    )}
                    
                    {isNext && (
                      <button 
                        onClick={(e) => handleStepComplete(e, step._id)}
                        className="px-6 py-3 border border-[#c4c7c7] font-['Inter'] text-[10px] tracking-[0.12em] font-semibold uppercase hover:border-black transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                        Mark Complete
                      </button>
                    )}
                    
                    {isLocked && (
                      <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        Complete previous steps to unlock
                      </span>
                    )}
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
