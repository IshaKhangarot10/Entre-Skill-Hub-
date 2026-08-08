'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function MentorSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    bio: '',
    experience: '',
    linkedIn: '',
    portfolio: '',
    expertise: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/mentors/me');
        const mentor = res.data;
        setFormData({
          bio: mentor.bio || '',
          experience: mentor.experience || '',
          linkedIn: mentor.linkedIn || '',
          portfolio: mentor.portfolio || '',
          expertise: mentor.expertise ? mentor.expertise.join(', ') : ''
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'mentor') fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const payload = {
        ...formData,
        expertise: formData.expertise.split(',').map(s => s.trim()).filter(Boolean)
      };
      
      await api.put('/mentors/profile', payload);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="loading-spinner"></div></div>;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        
        <header className="flex justify-between items-end border-b border-[#c4c7c7]/30 pb-8">
          <div>
            <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">Mentor Portal</span>
            <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
              Profile Settings
            </h1>
          </div>
        </header>

        {message.text && (
          <div className={`p-4 font-['Inter'] text-[12px] font-medium ${message.type === 'success' ? 'bg-[#d4edda] text-[#155724] border border-[#c3e6cb]' : 'bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb]'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 shadow-studio flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#c4c7c7]/30 pb-8">
            <div className="form-group mb-0">
              <input type="text" id="name" disabled value={user?.name || ''} className="input-line w-full py-2 text-[16px] text-[#747878] bg-transparent" />
              <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#c4c7c7]" htmlFor="name">Full Name (Cannot be changed here)</label>
            </div>
            <div className="form-group mb-0">
              <input type="email" id="email" disabled value={user?.email || ''} className="input-line w-full py-2 text-[16px] text-[#747878] bg-transparent" />
              <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#c4c7c7]" htmlFor="email">Email Address</label>
            </div>
          </div>

          <div className="form-group mb-0">
            <textarea id="bio" placeholder="BIO" rows="4"
                      value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} 
                      className="w-full bg-transparent border border-[#c4c7c7] focus:border-black focus:outline-none p-4 text-[16px] text-black resize-y"></textarea>
            <label className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mt-2 block" htmlFor="bio">Professional Bio</label>
          </div>

          <div className="form-group mb-0">
            <textarea id="experience" placeholder="EXPERIENCE" rows="3"
                      value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} 
                      className="w-full bg-transparent border border-[#c4c7c7] focus:border-black focus:outline-none p-4 text-[16px] text-black resize-y"></textarea>
            <label className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mt-2 block" htmlFor="experience">Relevant Experience</label>
          </div>

          <div className="form-group mb-0">
            <input type="text" id="expertise" placeholder="e.g., Marketing, SaaS, Fundraising" 
                   value={formData.expertise} onChange={e => setFormData({...formData, expertise: e.target.value})} 
                   className="input-line w-full py-2 text-[16px] text-black" />
            <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase mt-2 block text-[#747878]" htmlFor="expertise">Areas of Expertise (Comma separated)</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="form-group mb-0">
              <input type="url" id="linkedIn" placeholder="https://linkedin.com/in/..." 
                     value={formData.linkedIn} onChange={e => setFormData({...formData, linkedIn: e.target.value})} 
                     className="input-line w-full py-2 text-[16px] text-black" />
              <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase mt-2 block text-[#747878]" htmlFor="linkedIn">LinkedIn URL</label>
            </div>
            <div className="form-group mb-0">
              <input type="url" id="portfolio" placeholder="https://yourwebsite.com" 
                     value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} 
                     className="input-line w-full py-2 text-[16px] text-black" />
              <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase mt-2 block text-[#747878]" htmlFor="portfolio">Portfolio / Personal Site</label>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <button type="submit" disabled={saving} className="px-8 py-4 bg-black text-white font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase hover:bg-[#333] transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
