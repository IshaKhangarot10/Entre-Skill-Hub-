'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

export default function MentorMenteesPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/sessions');
        setSessions(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'mentor') fetchSessions();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  // Extract unique mentees
  const menteesMap = {};
  sessions.forEach(session => {
    if (session.menteeId) {
      const id = session.menteeId._id;
      if (!menteesMap[id]) {
        menteesMap[id] = {
          _id: id,
          name: session.menteeId.name,
          email: session.menteeId.email,
          totalSessions: 0,
          upcomingSessions: 0,
          lastSessionAt: null,
          nextSessionAt: null,
        };
      }
      
      menteesMap[id].totalSessions++;
      
      if (session.status === 'scheduled') {
        menteesMap[id].upcomingSessions++;
        if (!menteesMap[id].nextSessionAt || new Date(session.scheduledAt) < new Date(menteesMap[id].nextSessionAt)) {
          menteesMap[id].nextSessionAt = session.scheduledAt;
        }
      } else if (session.status === 'completed') {
        if (!menteesMap[id].lastSessionAt || new Date(session.scheduledAt) > new Date(menteesMap[id].lastSessionAt)) {
          menteesMap[id].lastSessionAt = session.scheduledAt;
        }
      }
    }
  });

  const mentees = Object.values(menteesMap);
  const filteredMentees = statusFilter === 'active' 
    ? mentees.filter(m => m.upcomingSessions > 0)
    : statusFilter === 'past'
      ? mentees.filter(m => m.upcomingSessions === 0 && m.totalSessions > 0)
      : mentees;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#c4c7c7]/30 pb-8">
          <div>
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">Mentor Portal</span>
            <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
              My Mentees
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`font-['Inter'] text-[10px] tracking-[0.1em] font-semibold uppercase px-4 py-2 border transition-colors ${statusFilter === 'all' ? 'border-black bg-black text-white' : 'border-[#c4c7c7] text-[#747878] hover:border-black hover:text-black'}`}
            >
              All ({mentees.length})
            </button>
            <button 
              onClick={() => setStatusFilter('active')}
              className={`font-['Inter'] text-[10px] tracking-[0.1em] font-semibold uppercase px-4 py-2 border transition-colors ${statusFilter === 'active' ? 'border-black bg-black text-white' : 'border-[#c4c7c7] text-[#747878] hover:border-black hover:text-black'}`}
            >
              Active
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentees.length > 0 ? (
            filteredMentees.map(mentee => (
              <div key={mentee._id} className="glass-panel p-8 flex flex-col justify-between hover:shadow-studio transition-shadow h-full">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#e8e8e8] border border-[#c4c7c7] flex items-center justify-center font-['Inter'] text-[14px] font-semibold text-black">
                      {mentee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-['Inter'] text-[16px] font-semibold text-black">{mentee.name}</h3>
                      <p className="font-['Inter'] text-[12px] text-[#747878]">{mentee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 pt-6 border-t border-[#c4c7c7]/30">
                    <div className="flex justify-between items-center">
                      <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878]">Total Sessions</span>
                      <span className="font-['Inter'] text-[12px] font-semibold">{mentee.totalSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878]">Next Session</span>
                      <span className="font-['Inter'] text-[12px] font-medium text-black">
                        {mentee.nextSessionAt ? new Date(mentee.nextSessionAt).toLocaleDateString() : 'None scheduled'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878]">Last Active</span>
                      <span className="font-['Inter'] text-[12px] font-medium text-[#747878]">
                        {mentee.lastSessionAt ? new Date(mentee.lastSessionAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-8 py-3 border border-black text-black font-['Inter'] text-[10px] tracking-[0.1em] font-semibold uppercase hover:bg-black hover:text-white transition-colors duration-300">
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full glass-panel p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
              <span className="material-symbols-outlined text-[48px] text-[#c4c7c7] mb-4">group_off</span>
              <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-black mb-2">No mentees found</h3>
              <p className="font-['Inter'] text-[14px] text-[#747878]">You don't have any mentees matching the current filter.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
