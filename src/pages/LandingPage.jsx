import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, ScanFace, Building, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-[#0B0E14]/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-white">HostelHub</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/login" className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Go to Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 animate-fade-in-up">
            <Zap size={14} className="animate-pulse" />
            <span>The AI-Powered Central System</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Smart Hostel Operations, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Zero Friction.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Replace scattered messages and paper registers with a single source of truth. Features AI identity verification, intelligent crowd alerts, and dedicated portals for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/login" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 w-full sm:w-auto justify-center">
              Enter Portal <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* The AI Twist Showcase */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The AI Twist</h2>
              <p className="text-gray-400">Next-generation features making hostels safer and smarter.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <ScanFace className="w-8 h-8 text-blue-400" />,
                  title: "AI Identity Verification",
                  desc: "Digital gate passes with facial recognition entry points to ensure maximum security.",
                  color: "from-blue-500/20 to-transparent border-blue-500/20"
                },
                {
                  icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
                  title: "Smart Analytics",
                  desc: "Predictive occupancy trends and complaint pattern recognition for proactive management.",
                  color: "from-purple-500/20 to-transparent border-purple-500/20"
                },
                {
                  icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
                  title: "Intelligent Alerts",
                  desc: "Automated crowd alerts for capacity management in mess and common areas.",
                  color: "from-emerald-500/20 to-transparent border-emerald-500/20"
                }
              ].map((feature, i) => (
                <div key={i} className={`p-8 rounded-3xl bg-gradient-to-b ${feature.color} border bg-[#151A22]/80 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300`}>
                  <div className="w-14 h-14 rounded-2xl bg-[#0B0E14] border border-white/5 flex items-center justify-center mb-6 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#151A22]/50 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Everything you need to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">manage at scale.</span>
                </h2>
                
                <ul className="space-y-4">
                  {[
                    "Dedicated Portals (Student, Admin, Warden)",
                    "Room Allocation & Occupancy Tracking",
                    "Fee & Electricity Billing Management",
                    "Mess Management & Daily Menu",
                    "Automated Leave Requests & Passes"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/login" className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  Explore Features <ArrowRight size={16} />
                </Link>
              </div>

              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent z-10" />
                  <div className="bg-[#1E2530] p-4 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="mx-auto px-4 py-1 rounded-md bg-[#0B0E14] border border-white/5 text-xs text-gray-500 font-mono">
                      admin.hostelhub.com
                    </div>
                  </div>
                  <div className="h-[300px] bg-[#151A22] p-6 relative">
                    {/* Mock Dashboard UI */}
                    <div className="flex gap-4 h-full">
                      <div className="w-1/4 space-y-3 hidden sm:block">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-8 rounded bg-white/5" />)}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="h-12 rounded-lg bg-blue-500/20 border border-blue-500/20 w-full" />
                        <div className="flex gap-4">
                          <div className="h-24 flex-1 rounded-lg bg-white/5 border border-white/5" />
                          <div className="h-24 flex-1 rounded-lg bg-white/5 border border-white/5" />
                        </div>
                        <div className="h-32 rounded-lg bg-white/5 border border-white/5 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm relative z-10 bg-[#0B0E14]">
        <p>© 2026 HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
