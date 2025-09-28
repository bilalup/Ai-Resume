import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (setToken) setToken(null);
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="w-full bg-white border-b shadow-sm"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold text-slate-800">AI Resume</Link>
          <span className="text-sm text-slate-500">Generator</span>
        </div>

        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/login" className="text-sm px-3 py-1 rounded hover:bg-slate-100">Login</Link>
              <Link to="/register" className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm px-3 py-1 rounded hover:bg-slate-100">Dashboard</Link>
              <Link to="/generate" className="text-sm px-3 py-1 rounded hover:bg-slate-100">Generate</Link>
              <button onClick={handleLogout} className="text-sm text-red-500 px-3 py-1 rounded hover:bg-slate-100">Logout</button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
