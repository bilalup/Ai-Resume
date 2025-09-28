import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api.js';
import ResumeCard from '../components/ResumeCard.jsx';
import ResumeForm from '../components/ResumeForm.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchResumes = async () => {
    try {
      const res = await API.get('/resume');
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/register');
    fetchResumes();
  }, []);

  const handleSuccess = async () => {
    setShowModal(false);
    await fetchResumes();
  };

  const handleAssumeGenerate = async () => {
    try {
      const body = {
        title: 'Software Engineer Resume',
        name: 'Jane Example',
        experience: '3 years at Example Inc. Built full-stack apps and led performance improvements.',
        skills: 'React, Node.js, MongoDB, Docker',
        education: 'BSc Computer Science'
      };
      await API.post('/resume/create', body);
      alert('Resume generated!');
      fetchResumes();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to generate.');
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600">Manage and generate your resumes</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Open Generate Modal
          </button>
          <button onClick={handleAssumeGenerate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Generate (Assume)
          </button>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.length === 0 ? (
          <div className="col-span-full p-6 bg-white rounded shadow text-center">
            <p className="text-slate-600">No resumes yet — generate one using the buttons above.</p>
          </div>
        ) : (
          resumes.map((r) => <ResumeCard key={r._id} resume={r} />)
        )}
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Generate Resume</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500">Close</button>
            </div>
            <ResumeForm onSuccess={handleSuccess} submittingText="Generate from Modal" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
