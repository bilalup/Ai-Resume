import { useState } from 'react';
import API from '../utils/api.js';

export default function ResumeForm({ initial = {}, onSuccess, submittingText = 'Generate' }) {
  const [title, setTitle] = useState(initial.title || '');
  const [name, setName] = useState(initial.name || '');
  const [experience, setExperience] = useState(initial.experience || '');
  const [skills, setSkills] = useState(initial.skills || '');
  const [education, setEducation] = useState(initial.education || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    try {
      const body = { title, name, experience, skills, education };
      const res = await API.post('/resume/create', body);
      setLoading(false);
      alert('Resume created successfully!');
      if (onSuccess) onSuccess(res.data.resume);
    } catch (err) {
      setLoading(false);
      alert(err?.response?.data?.message || 'Generation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="e.g. Software Engineer Resume" required />
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Your full name" required />
      </div>

      <div>
        <label className="text-sm font-medium">Experience</label>
        <textarea value={experience} onChange={e=>setExperience(e.target.value)} className="w-full mt-1 p-2 border rounded" rows="4" placeholder="Work history, roles, achievements"></textarea>
      </div>

      <div>
        <label className="text-sm font-medium">Skills</label>
        <input value={skills} onChange={e=>setSkills(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Comma separated skills" />
      </div>

      <div>
        <label className="text-sm font-medium">Education</label>
        <input value={education} onChange={e=>setEducation(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Degree & institution" />
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? 'Generating...' : submittingText}
        </button>
        <button type="button" onClick={()=>{
          setTitle('Software Engineer Resume');
          setName('John Doe');
          setExperience('3 years at ExampleCorp — built features, improved performance and delivered products.');
          setSkills('JavaScript, React, Node.js, MongoDB');
          setEducation('BSc Computer Science');
        }} className="px-4 py-2 rounded border hover:bg-slate-50">
          Fill Sample
        </button>
      </div>
    </form>
  );
}
