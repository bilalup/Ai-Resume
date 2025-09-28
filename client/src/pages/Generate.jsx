import ResumeForm from '../components/ResumeForm.jsx';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Generate() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleSuccess = (resume) => {
    navigate('/dashboard');
  };

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Generate Resume</h2>
          <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-500">Back</button>
        </div>

        <p className="text-slate-600 mb-4">Fill the form below and click Generate. Use "Fill Sample" to auto-populate sample content.</p>

        <ResumeForm onSuccess={handleSuccess} submittingText="Generate Resume"/>
      </div>
    </motion.div>
  );
}
