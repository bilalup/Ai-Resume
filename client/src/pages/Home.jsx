import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleGenerate = () => {
    if (!token) return navigate('/register');
    navigate('/generate');
  };

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">AI-Powered Resume & Portfolio Builder</h1>
            <p className="text-slate-600 mb-6">Generate a professional resume in seconds — pick a template, provide details, or let AI draft it for you.</p>
            <div className="flex gap-3">
              <button onClick={handleGenerate} className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700">Generate Resume</button>
              <button onClick={()=>navigate('/register')} className="px-5 py-3 rounded border">Get Started</button>
            </div>
          </div>
          <div className="w-48">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Sample</p>
              <h3 className="font-semibold">Modern Clean Template</h3>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
