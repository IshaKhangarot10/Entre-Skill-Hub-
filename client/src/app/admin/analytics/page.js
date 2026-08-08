'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function AdminAnalyticsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setActionLoading(userId);
    try {
      await api.put(`/admin/users/${userId}/status`, { status: newStatus });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
      // Refresh stats
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data);
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'bar_chart' },
    { id: 'users', label: 'Users', icon: 'group' },
    { id: 'mentors', label: 'Mentors', icon: 'school' },
    { id: 'ideas', label: 'Ideas & Roadmaps', icon: 'flag' },
    { id: 'resources', label: 'Resource Approval', icon: 'approval' },
  ];

  const filteredUsers = activeTab === 'mentors'
    ? users.filter(u => u.role === 'mentor')
    : activeTab === 'users'
      ? users
      : users;

  const recentSignups = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#c4c7c7]/30 bg-white hidden md:flex flex-col h-screen fixed left-0 top-0">
        <div className="p-8 border-b border-[#c4c7c7]/30">
          <div className="font-['Playfair_Display'] text-[24px] tracking-[-0.02em] font-semibold text-black">EntreSkill</div>
          <div className="font-['Inter'] text-[10px] tracking-[0.05em] uppercase text-[#747878] mt-1">Admin Portal</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors w-full text-left ${
                activeTab === item.id
                  ? 'bg-black text-white'
                  : 'text-[#5e5e5e] hover:bg-[#f3f3f4]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#c4c7c7]/30">
          <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-[#747878] hover:text-black hover:bg-[#f3f3f4] rounded font-['Inter'] text-[12px] font-medium uppercase tracking-[0.05em] transition-colors">
            <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-[24px] md:p-[64px] pb-24">

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'overview' && (
          <>
            <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8 flex justify-between items-end">
              <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
                Analytics Overview
              </h1>
            </header>

            {/* KPIs */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Total Users</span>
                <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.totalUsers ?? 0}</div>
              </div>
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Active Mentors</span>
                <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.totalMentors ?? 0}</div>
                {stats?.pendingMentors > 0 && (
                  <div className="font-['Inter'] text-[10px] text-[#ba6d00] mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">pending</span>
                    {stats.pendingMentors} pending approval
                  </div>
                )}
              </div>
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Total Ideas</span>
                <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.totalIdeas ?? 0}</div>
              </div>
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Avg. Completion</span>
                <div className="font-['Playfair_Display'] text-[40px] font-semibold text-black">{stats?.avgCompletion ?? 0}<span className="text-[20px] text-[#747878]">%</span></div>
              </div>
            </section>

            {/* Stats Row 2 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Total Sessions</span>
                <div className="font-['Playfair_Display'] text-[32px] font-semibold text-black">{stats?.totalSessions ?? 0}</div>
              </div>
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Pending Resources</span>
                <div className="font-['Playfair_Display'] text-[32px] font-semibold text-black">{stats?.pendingResources ?? 0}</div>
              </div>
              <div className="glass-panel p-6">
                <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] block mb-2">Satisfaction Score</span>
                <div className="font-['Playfair_Display'] text-[32px] font-semibold text-black">{stats?.avgSatisfaction ?? 0}<span className="text-[16px] text-[#747878]"> / 5</span></div>
              </div>
            </section>

            {/* Recent Signups */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel p-8">
                <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-black mb-6">Platform Summary</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Open Feedback</span>
                    <span className="font-['Playfair_Display'] text-[28px] font-semibold">{stats?.openFeedback ?? 0}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Pending Mentors</span>
                    <span className="font-['Playfair_Display'] text-[28px] font-semibold">{stats?.pendingMentors ?? 0}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Total Users</span>
                    <span className="font-['Playfair_Display'] text-[28px] font-semibold">{users.length}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Active Users</span>
                    <span className="font-['Playfair_Display'] text-[28px] font-semibold">{users.filter(u => u.status === 'active').length}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8">
                <h3 className="font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-black mb-6">Recent Signups</h3>
                <div className="flex flex-col gap-4">
                  {recentSignups.length > 0 ? recentSignups.map(u => (
                    <div key={u._id} className="flex justify-between items-center border-b border-[#e8e8e8] pb-3 last:border-0 last:pb-0">
                      <div className="flex flex-col">
                        <span className="font-['Inter'] text-[12px] font-semibold">{u.name}</span>
                        <span className="font-['Inter'] text-[10px] text-[#747878]">{u.email}</span>
                      </div>
                      <span className="font-['Inter'] text-[10px] text-[#c4c7c7]">{timeAgo(u.createdAt)}</span>
                    </div>
                  )) : (
                    <span className="text-[12px] text-[#747878]">No users yet.</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ═══ USERS TAB ═══ */}
        {activeTab === 'users' && (
          <>
            <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8">
              <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
                User Management
              </h1>
              <p className="font-['Inter'] text-[12px] text-[#747878] mt-2">{users.length} total accounts</p>
            </header>

            <div className="flex flex-col gap-3">
              {users.map(u => (
                <div key={u._id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-['Inter'] text-[14px] font-semibold text-black">{u.name}</h3>
                      <span className={`text-[9px] tracking-[0.1em] uppercase font-semibold px-2 py-0.5 rounded-full ${
                        u.role === 'admin' ? 'bg-black text-white' :
                        u.role === 'mentor' ? 'bg-[#e8e8e8] text-black' :
                        'bg-[#f3f3f4] text-[#747878]'
                      }`}>{u.role}</span>
                      <span className={`text-[9px] tracking-[0.1em] uppercase font-semibold px-2 py-0.5 rounded-full ${
                        u.status === 'active' ? 'bg-[#d4edda] text-[#155724]' : 'bg-[#f8d7da] text-[#721c24]'
                      }`}>{u.status}</span>
                    </div>
                    <p className="font-['Inter'] text-[11px] text-[#747878] mt-1">{u.email}</p>
                    <p className="font-['Inter'] text-[10px] text-[#c4c7c7] mt-1">Joined: {new Date(u.createdAt).toLocaleDateString()}</p>
                  </div>
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleStatusToggle(u._id, u.status)}
                      disabled={actionLoading === u._id}
                      className={`px-4 py-2 font-['Inter'] text-[10px] tracking-[0.05em] uppercase font-semibold border transition-colors disabled:opacity-50 ${
                        u.status === 'active'
                          ? 'border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white'
                          : 'border-[#155724] text-[#155724] hover:bg-[#155724] hover:text-white'
                      }`}
                    >
                      {actionLoading === u._id ? '...' : u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ MENTORS TAB ═══ */}
        {activeTab === 'mentors' && (
          <>
            <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8">
              <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
                Mentor Management
              </h1>
              <p className="font-['Inter'] text-[12px] text-[#747878] mt-2">
                {stats?.totalMentors ?? 0} approved · {stats?.pendingMentors ?? 0} pending
              </p>
            </header>

            <div className="flex flex-col gap-3">
              {users.filter(u => u.role === 'mentor').length > 0 ? (
                users.filter(u => u.role === 'mentor').map(u => (
                  <div key={u._id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-['Inter'] text-[14px] font-semibold text-black">{u.name}</h3>
                      <p className="font-['Inter'] text-[11px] text-[#747878] mt-1">{u.email}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {u.skills?.map(s => (
                          <span key={s._id || s} className="text-[9px] tracking-[0.05em] uppercase bg-[#f3f3f4] px-2 py-0.5 rounded-full text-[#5e5e5e]">
                            {s.name || 'Skill'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`text-[9px] tracking-[0.1em] uppercase font-semibold px-2 py-0.5 rounded-full ${
                      u.status === 'active' ? 'bg-[#d4edda] text-[#155724]' : 'bg-[#f8d7da] text-[#721c24]'
                    }`}>{u.status}</span>
                  </div>
                ))
              ) : (
                <div className="glass-panel p-12 text-center text-[#747878] font-['Inter'] text-[12px]">No mentors registered yet.</div>
              )}
            </div>
          </>
        )}

        {/* ═══ IDEAS TAB ═══ */}
        {activeTab === 'ideas' && (
          <>
            <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8">
              <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
                Ideas & Roadmaps
              </h1>
              <p className="font-['Inter'] text-[12px] text-[#747878] mt-2">{stats?.totalIdeas ?? 0} business ideas in the system</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-8 flex flex-col items-center justify-center gap-2 h-40">
                <span className="font-['Playfair_Display'] text-[48px] font-semibold text-black">{stats?.totalIdeas ?? 0}</span>
                <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Business Ideas</span>
              </div>
              <div className="glass-panel p-8 flex flex-col items-center justify-center gap-2 h-40">
                <span className="font-['Playfair_Display'] text-[48px] font-semibold text-black">{stats?.totalSessions ?? 0}</span>
                <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Mentor Sessions</span>
              </div>
              <div className="glass-panel p-8 flex flex-col items-center justify-center gap-2 h-40">
                <span className="font-['Playfair_Display'] text-[48px] font-semibold text-black">{stats?.avgCompletion ?? 0}%</span>
                <span className="text-[10px] tracking-[0.05em] uppercase text-[#747878]">Avg. Completion</span>
              </div>
            </div>
          </>
        )}

        {/* ═══ RESOURCES TAB ═══ */}
        {activeTab === 'resources' && (
          <>
            <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8">
              <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
                Resource Approval
              </h1>
              <p className="font-['Inter'] text-[12px] text-[#747878] mt-2">{stats?.pendingResources ?? 0} resources pending review</p>
            </header>

            <div className="glass-panel p-12 text-center">
              <span className="material-symbols-outlined text-[48px] text-[#c4c7c7] mb-4 block" style={{ fontVariationSettings: "'wght' 200" }}>approval</span>
              <p className="font-['Inter'] text-[14px] text-[#747878]">
                {stats?.pendingResources > 0
                  ? `${stats.pendingResources} resource(s) waiting for admin review.`
                  : 'All resources have been reviewed. No pending items.'}
              </p>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
