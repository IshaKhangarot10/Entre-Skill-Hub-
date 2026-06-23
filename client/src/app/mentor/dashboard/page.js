'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function MentorDashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const [profileRes, sessionsRes] = await Promise.all([
          api.get('/mentors/me'),
          api.get('/sessions')
        ]);
        setProfile(profileRes.data);
        setSessions(sessionsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'mentor') fetchMentorData();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  const pendingQuestions = [
    { id: 1, author: 'Marcus Chen', time: '2h ago', content: "I'm struggling with the architectural layout for the new microservices deployment. Should we centralize the auth gateway?" },
    { id: 2, author: 'Sarah Jenkins', time: '5h ago', content: "Regarding my portfolio review, do you think including the experimental project distracts from my core case studies?" }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-[48px]">
        
        {/* Header */}
        <header className="flex flex-col gap-[12px]">
          <h1 className="font-['Playfair_Display'] text-[32px] md:text-[80px] leading-tight tracking-[-0.04em] font-bold text-black max-w-3xl">
            Welcome Back, <br className="md:hidden"/>{user?.name?.split(' ')[0]}.
          </h1>
          <p className="font-['Inter'] text-[18px] text-[#5e5e5e] max-w-2xl mt-4">
            Your mentorship ecosystem is active. You have pending questions requiring attention before your next session.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-48">
            <div className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">Active Mentees</div>
            <div className="font-['Playfair_Display'] text-[48px] font-semibold text-black">{profile?.totalMentees || 0}</div>
          </div>
          <div className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-48">
            <div className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">Sessions This Week</div>
            <div className="font-['Playfair_Display'] text-[48px] font-semibold text-black">{sessions.filter(s => s.status === 'scheduled').length}</div>
          </div>
          <div className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-48">
            <div className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">Avg. Response Time</div>
            <div className="font-['Playfair_Display'] text-[48px] font-semibold text-black">{profile?.avgResponseTime || '2.4h'}</div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {/* Pending Q&A */}
          <section className="md:col-span-8 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-[#c4c7c7]/30 pb-4">
              <h2 className="font-['Playfair_Display'] text-[32px] font-semibold text-black">Pending Q&A</h2>
              <button className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] hover:text-black">View All</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {pendingQuestions.map(q => (
                <div key={q.id} className="glass-panel p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center hover:shadow-studio transition-shadow">
                  <div className="flex flex-col gap-2 max-w-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e8e8e8] border border-[#c4c7c7] flex items-center justify-center font-['Inter'] text-[10px] font-medium">
                        {q.author.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span className="font-['Inter'] text-[11px] font-semibold uppercase">{q.author}</span>
                      <span className="font-['Inter'] text-[10px] text-[#747878]">• {q.time}</span>
                    </div>
                    <p className="font-['Inter'] text-[14px] text-[#5e5e5e] line-clamp-2">{q.content}</p>
                  </div>
                  <button className="shrink-0 px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase mt-4 md:mt-0">
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Sessions */}
          <section className="md:col-span-4 flex flex-col gap-6 mt-12 md:mt-0">
            <div className="flex justify-between items-end border-b border-[#c4c7c7]/30 pb-4">
              <h2 className="font-['Playfair_Display'] text-[32px] font-semibold text-black">Next Up</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {sessions.filter(s => s.status === 'scheduled').slice(0, 3).map((session, idx) => (
                <div key={session._id} className={`glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group ${idx > 0 ? 'opacity-70' : ''}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${idx === 0 ? 'bg-black' : 'bg-[#c4c7c7]'}`}></div>
                  <div className="flex justify-between items-start pl-2">
                    <div className="flex flex-col">
                      <span className="font-['Playfair_Display'] text-[32px] font-semibold text-black leading-none">
                        {new Date(session.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] mt-1">
                        {new Date(session.scheduledAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-[#e8e8e8] font-['Inter'] text-[10px] font-medium rounded">{session.duration}m</span>
                  </div>
                  <div className="pt-4 border-t border-[#c4c7c7]/20 pl-2">
                    <h3 className="font-['Inter'] text-[11px] font-semibold uppercase">{session.title}</h3>
                    <p className="font-['Inter'] text-[12px] text-[#5e5e5e] mt-1">with {session.menteeId?.name || 'Mentee'}</p>
                  </div>
                </div>
              ))}
              {sessions.filter(s => s.status === 'scheduled').length === 0 && (
                <div className="text-center p-6 border border-dashed border-[#c4c7c7] text-[#747878] text-[12px]">
                  No upcoming sessions.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
