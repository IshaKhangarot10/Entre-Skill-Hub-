'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function StepContentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const [stepRes, roadmapRes] = await Promise.all([
          api.get(`/roadmaps/step/${params.stepId}`),
          api.get(`/roadmaps/${params.id}`)
        ]);
        setStep(stepRes.data);
        setRoadmap(roadmapRes.data.roadmap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchStepData();
  }, [params.id, params.stepId, user]);

  const handleComplete = async () => {
    try {
      await api.post('/progress/complete', {
        roadmapId: roadmap._id,
        stepId: step._id
      });
      // Also log 1 hour of time for this step
      await api.put(`/progress/${roadmap._id}/hours`, { hours: 1 });
      router.push(`/roadmap/${roadmap._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;
  if (!step) return <div className="min-h-screen pt-32 text-center">Step not found</div>;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-24 pb-24">
      {/* Top utility bar */}
      <div className="w-full border-b border-[#c4c7c7]/30 bg-white/50 backdrop-blur-md px-[24px] md:px-[64px] py-4 sticky top-0 md:top-[80px] z-40 flex justify-between items-center">
        <Link href={`/roadmap/${roadmap?._id}`} className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] hover:text-black flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Back to Timeline
        </Link>
        <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-black font-semibold">
          Module 0{step.order}: {step.title}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-[24px] md:px-[64px] mt-12 flex flex-col gap-12">
        
        {/* Header */}
        <header>
          <div className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold text-[#747878] uppercase mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            {step.estimatedDuration} to complete
          </div>
          <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black mb-6">
            {step.title}
          </h1>
          <p className="font-['Inter'] text-[18px] leading-[28px] text-[#5e5e5e] border-l border-[#c4c7c7] pl-6">
            {step.content}
          </p>
        </header>

        {/* Video Module (Placeholder structure) */}
        <div className="glass-panel w-full aspect-video flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer bg-black text-white">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          {/* Abstract pattern to simulate video thumbnail */}
          <div className="absolute inset-0 abstract-line opacity-30 z-0"></div>
          
          <div className="z-20 w-20 h-20 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <span className="material-symbols-outlined text-[32px] ml-1">play_arrow</span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex justify-between items-end">
            <div>
              <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#e8e8e8] mb-1 block">Masterclass</span>
              <h3 className="font-['Playfair_Display'] text-[24px] font-semibold">{step.videoTitle || 'Instructional Video'}</h3>
            </div>
            <span className="font-['Inter'] text-[12px] font-mono bg-white/20 px-2 py-1 rounded">{step.videoDuration || '05:00'}</span>
          </div>
        </div>

        {/* Action Items List */}
        <div className="mt-8">
          <h2 className="font-['Inter'] text-[14px] tracking-[0.12em] font-semibold uppercase text-black hairline-b pb-4 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            Action Items
          </h2>
          
          <div className="flex flex-col gap-4">
            {step.actionItems && step.actionItems.map((item, idx) => (
              <label key={idx} className="flex items-start gap-4 p-6 border border-[#c4c7c7] hover:border-black transition-colors cursor-pointer group bg-white">
                <div className="relative flex items-center justify-center mt-1">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border border-[#c4c7c7] checked:bg-black checked:border-black transition-colors cursor-pointer" />
                  <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                </div>
                <div>
                  <div className="font-['Inter'] text-[14px] font-semibold text-black mb-1 group-hover:underline underline-offset-4 decoration-1">{item.text}</div>
                  <div className="font-['Inter'] text-[12px] text-[#747878]">{item.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Resources */}
        {step.resourceLinks && step.resourceLinks.length > 0 && (
          <div className="mt-4">
            <h2 className="font-['Inter'] text-[14px] tracking-[0.12em] font-semibold uppercase text-black hairline-b pb-4 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              Resources & Downloads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.resourceLinks.map((res, idx) => (
                <a key={idx} href={res.url} className="glass-panel p-4 flex items-center justify-between hover:bg-black hover:text-white transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-[#747878] group-hover:text-white transition-colors">
                      {res.type === 'download' ? 'cloud_download' : 'article'}
                    </span>
                    <span className="font-['Inter'] text-[12px] font-medium">{res.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Completion CTA */}
        <div className="mt-12 border-t border-[#c4c7c7]/30 pt-12 flex flex-col items-center text-center">
          <p className="font-['Inter'] text-[12px] text-[#5e5e5e] mb-6">Finished with the material and action items?</p>
          <button 
            onClick={handleComplete}
            className="bg-black text-white px-12 py-5 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase flex items-center gap-3 hover:scale-[1.02] transition-transform"
          >
            Mark Module Complete
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </button>
        </div>

      </div>
    </div>
  );
}
