'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function AdminAnalyticsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'admin') fetchStats();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#c4c7c7]/30 bg-white hidden md:flex flex-col h-screen fixed left-0 top-0">
        <div className="p-8 border-b border-[#c4c7c7]/30">
          <div className="font-['Playfair_Display'] text-[24px] tracking-[-0.02em] font-semibold text-black">SKILLSPARK</div>
          <div className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] mt-1">Admin Portal</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em]">
            <span className="material-symbols-outlined text-[18px]">bar_chart</span> Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#5e5e5e] hover:bg-[#f3f3f4] rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors">
            <span className="material-symbols-outlined text-[18px]">group</span> Users
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#5e5e5e] hover:bg-[#f3f3f4] rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors">
            <span className="material-symbols-outlined text-[18px]">school</span> Mentors
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#5e5e5e] hover:bg-[#f3f3f4] rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors">
            <span className="material-symbols-outlined text-[18px]">flag</span> Ideas & Roadmaps
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#5e5e5e] hover:bg-[#f3f3f4] rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors">
            <span className="material-symbols-outlined text-[18px]">approval</span> Resource Approval
          </a>
        </nav>
        <div className="p-4 border-t border-[#c4c7c7]/30">
          <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-[#747878] hover:text-black hover:bg-[#f3f3f4] rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors">
            <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-[24px] md:p-[64px] pb-24">
        <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8 flex justify-between items-end">
          <div>
            <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
              Analytics Overview
            </h1>
          </div>
          <button className="px-6 py-2 border border-[#c4c7c7] font-['Inter'] text-[10px] tracking-[0.05em] uppercase hover:border-black transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">download</span> Export Report
          </button>
        </header>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-panel p-6">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Total Users</span>
            <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.users || 0}</div>
            <div className="font-['Inter'] text-[10px] text-[#000] mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +12% this month</div>
          </div>
          <div className="glass-panel p-6">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Active Mentors</span>
            <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.mentors || 0}</div>
            <div className="font-['Inter'] text-[10px] text-[#000] mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +3% this month</div>
          </div>
          <div className="glass-panel p-6">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Total Ideas</span>
            <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.ideas || 0}</div>
          </div>
          <div className="glass-panel p-6">
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Roadmaps</span>
            <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.roadmaps || 0}</div>
          </div>
        </section>

        {/* Charts/Data Section (Placeholder structure matching Stitch) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-8">
            <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-black mb-6">User Acquisition</h3>
            <div className="w-full h-64 bg-[#f3f3f4] border border-[#e8e8e8] flex items-center justify-center text-[#c4c7c7] font-['Inter'] text-[12px]">
              Chart Visualization Area
            </div>
          </div>
          
          <div className="glass-panel p-8">
             <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-black mb-6">Recent Signups</h3>
             <div className="flex flex-col gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="flex justify-between items-center border-b border-[#e8e8e8] pb-3 last:border-0 last:pb-0">
                   <div className="flex flex-col">
                     <span className="font-['Inter'] text-[12px] font-semibold">User {i}</span>
                     <span className="font-['Inter'] text-[10px] text-[#747878]">user{i}@example.com</span>
                   </div>
                   <span className="font-['Inter'] text-[10px] text-[#c4c7c7]">{i}d ago</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
