
import React from 'react';
import { ShieldCheck, Copyright, Mail, ExternalLink, Sparkles, LayoutGrid } from 'lucide-react';

const InfoView: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-4">
        <div className="w-32 h-32 bg-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl p-3 border border-slate-100 ring-4 ring-slate-50">
           <img src="logo.png" alt="Teen Guru Press" className="w-full h-full object-contain" onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://img.icons8.com/fluency/96/book.png';
          }} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#1a237e]">Focus & <span className="text-[#26a69a]">Reset</span></h2>
          <p className="text-slate-400 font-medium italic">Study Planner by Teen Guru Press</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Privacy Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-[#1a237e]">
            <ShieldCheck size={24} />
            <h3 className="text-lg font-black uppercase tracking-tight">Privacy Policy</h3>
          </div>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              At <strong>Teen Guru Press</strong>, your privacy is our priority. This app is designed to be completely offline and private.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-500">
              <li>All study data is stored locally on your device only.</li>
              <li>We do not track, collect, or share your personal information.</li>
              <li>No internet connection is required for data storage.</li>
              <li>Your notes and plans are your property.</li>
            </ul>
          </div>
        </section>

        {/* Copyright Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-[#26a69a]">
            <Copyright size={24} />
            <h3 className="text-lg font-black uppercase tracking-tight">Copyright</h3>
          </div>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3">
            <p>
              &copy; {new Date().getFullYear()} <strong>Teen Guru Press</strong>. All rights reserved.
            </p>
            <p className="text-slate-500">
              The layout, "Focus & Reset" branding, and unique study frameworks provided in this application are intellectual property. Any unauthorized use or distribution of our content is prohibited.
            </p>
          </div>
        </section>

        {/* Other Apps Section */}
        <section className="bg-gradient-to-br from-[#1a237e] to-[#26a69a] rounded-3xl p-6 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
              <LayoutGrid size={20} className="text-white" /> Other Apps
            </h3>
            <Sparkles size={20} className="text-yellow-300 animate-pulse" />
          </div>
          <p className="text-indigo-100 text-sm font-medium">
            Explore our collection of tools designed specifically for students and lifelong learners. Keep an eye on Google Play for more from Teen Guru Press!
          </p>
          <button 
            className="w-full bg-white text-[#1a237e] font-black py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
            onClick={() => alert("Stay tuned for our upcoming Productivity Suite on Google Play!")}
          >
            Explore the Collection
            <ExternalLink size={16} />
          </button>
        </section>

        {/* Support Section */}
        <section className="bg-slate-100 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Mail size={16} /> Contact Support
          </h3>
          <p className="text-slate-600 text-xs">
            Need help or have suggestions? We love hearing from our users.
          </p>
          <a 
            href="mailto:teengurupress@socialworker.net" 
            className="block text-center bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl transition-all"
          >
            teengurupress@socialworker.net
          </a>
        </section>
      </div>

      <div className="text-center pt-4 opacity-30">
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Crafted by Teen Guru Press</p>
      </div>
    </div>
  );
};

export default InfoView;