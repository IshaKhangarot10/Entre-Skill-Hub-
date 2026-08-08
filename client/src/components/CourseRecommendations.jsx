'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function CourseRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await api.get('/ai/recommend-courses');
        setRecommendations(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load AI recommendations.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="w-full glass-panel p-8 min-h-[300px] flex flex-col items-center justify-center gap-4">
        <div className="loading-spinner"></div>
        <p className="font-['Inter'] text-[12px] text-[#747878] tracking-[0.05em] uppercase">Generating Personalized Learning Path...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full glass-panel p-8 text-center text-[#721c24] bg-[#f8d7da] border border-[#f5c6cb]">
        <p className="font-['Inter'] text-[14px]">{error}</p>
        <p className="font-['Inter'] text-[12px] opacity-70 mt-2">Ensure GEMINI_API_KEY is configured.</p>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="w-full mt-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[24px] text-black">auto_awesome</span>
        <h2 className="font-['Playfair_Display'] text-[24px] font-semibold text-black">AI Recommended Courses</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((course, idx) => (
          <a 
            key={idx} 
            href={course.url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel p-6 flex flex-col justify-between hover:shadow-studio transition-shadow gap-4 block cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-['Inter'] text-[16px] font-semibold text-black line-clamp-2 group-hover:underline decoration-1 underline-offset-2">{course.title}</h3>
                <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] shrink-0 border ${
                  course.difficulty === 'Beginner' ? 'border-[#28a745] text-[#28a745]' :
                  course.difficulty === 'Intermediate' ? 'border-[#fd7e14] text-[#fd7e14]' :
                  'border-[#dc3545] text-[#dc3545]'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <p className="font-['Inter'] text-[12px] font-medium text-[#747878] mt-1">{course.platform}</p>
            </div>
            
            <div className="pt-4 border-t border-[#c4c7c7]/30 flex justify-between items-end">
              <div className="flex-1">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] block mb-1">Why this course:</span>
                <p className="font-['Inter'] text-[13px] text-[#444748] italic">"{course.reason}"</p>
              </div>
              <span className="material-symbols-outlined text-[16px] text-black opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                arrow_outward
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
