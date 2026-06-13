import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { ArrowRight, User, Lock, ShieldCheck, Fingerprint, Activity } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, addToast } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      addToast('Authentication successful', 'success');
      // Redirection handled in App.jsx
    } else {
      addToast(result.message || 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0B0E14] selection:bg-blue-500/30 font-sans">
      
      {/* Left Panel - Image Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[10s] ease-out"
          style={{ backgroundImage: 'url(/login-bg.png)' }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-transparent" />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end p-16 h-full w-full">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide mb-6">
              <Activity size={14} className="text-blue-400" />
              <span>System Online</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              Next-Generation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Hostel Management
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed mb-8">
              Centralized operations with AI identity verification, intelligent crowd alerts, and predictive occupancy analytics.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#0B0E14] bg-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">AM</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#0B0E14] bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">SW</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#0B0E14] bg-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">RK</div>
              </div>
              <p className="text-sm text-gray-400 font-medium">Trusted by 500+ Institutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 relative overflow-hidden">
        {/* Subtle glowing orb in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-blue-900/10 to-purple-900/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-6">
              <span className="text-xl font-bold text-white">H</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-gray-400">Enter your credentials to access the portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
                Username or Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#151A22] border border-white/10 rounded-xl text-white focus:bg-[#1E2530] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder-gray-600 shadow-inner"
                  placeholder="Username or email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center pl-1 pr-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-400 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#151A22] border border-white/10 rounded-xl text-white focus:bg-[#1E2530] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder-gray-600 shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-100 text-[#0B0E14] font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 group mt-6 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0B0E14]/30 border-t-[#0B0E14] rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <Fingerprint size={14} />
              <span>Biometric verification enabled</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Secured with enterprise-grade 256-bit encryption. <br className="hidden sm:block" />
              Unauthorized access is strictly prohibited.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
