'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function MentorUploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [roadmaps, setRoadmaps] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'video',
    url: '',
    content: '',
    relatedRoadmapId: ''
  });

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await api.get('/roadmaps');
        setRoadmaps(res.data);
      } catch (err) {}
    };
    fetchRoadmaps();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/resources', formData);
      alert('Resource submitted for approval successfully!');
      router.push('/mentor/dashboard');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-[#c4c7c7]/30 pb-8">
          <span className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mb-2 block">Content Contribution</span>
          <h1 className="font-['Playfair_Display'] text-[40px] md:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-black">
            Upload Resource
          </h1>
          <p className="font-['Inter'] text-[16px] text-[#5e5e5e] mt-4">
            Contribute to the platform's knowledge base. All submissions will be reviewed by administrators before being published.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 shadow-studio flex flex-col gap-8">
          
          <div className="form-group mb-0">
            <input type="text" id="title" placeholder="TITLE" required 
                   value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} 
                   className="input-line w-full py-2 text-[16px] text-black" />
            <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase" htmlFor="title">Resource Title</label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878]">Resource Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['video', 'article', 'checklist', 'download'].map(type => (
                <button type="button" key={type} onClick={() => setFormData({...formData, type})} 
                  className={`p-4 border font-['Inter'] text-[11px] font-semibold uppercase flex flex-col items-center gap-2 transition-colors ${
                    formData.type === type ? 'border-black bg-black text-white' : 'border-[#c4c7c7] bg-white text-[#5e5e5e] hover:border-black'
                  }`}>
                  <span className="material-symbols-outlined text-[20px]">
                    {type === 'video' ? 'play_circle' : type === 'article' ? 'article' : type === 'checklist' ? 'checklist' : 'cloud_download'}
                  </span>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group mb-0">
            <select id="roadmap" required
                    value={formData.relatedRoadmapId} onChange={e => setFormData({...formData, relatedRoadmapId: e.target.value})}
                    className="input-line w-full py-2 text-[16px] text-black appearance-none cursor-pointer">
              <option value="" disabled>Select related roadmap</option>
              {roadmaps.map(rm => (
                <option key={rm._id} value={rm._id}>{rm.title}</option>
              ))}
            </select>
            <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase" htmlFor="roadmap">Related Roadmap</label>
          </div>

          <div className="form-group mb-0">
            <input type="url" id="url" placeholder="URL" 
                   value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} 
                   className="input-line w-full py-2 text-[16px] text-black" />
            <label className="form-label font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase" htmlFor="url">External URL / Media Link</label>
          </div>

          <div className="form-group mb-0">
            <textarea id="content" placeholder="CONTENT" rows="4"
                      value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} 
                      className="w-full bg-transparent border border-[#c4c7c7] focus:border-black focus:outline-none p-4 text-[16px] text-black resize-y"></textarea>
            <label className="font-['Inter'] text-[10px] tracking-[0.05em] font-medium uppercase text-[#747878] mt-2 block" htmlFor="content">Description or Text Content</label>
          </div>

          <div className="pt-8 border-t border-[#c4c7c7]/30 flex justify-end gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase text-[#747878] hover:text-black">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-8 py-4 bg-black text-white font-['Inter'] text-[11px] tracking-[0.12em] font-semibold uppercase hover:bg-[#333] transition-colors disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
