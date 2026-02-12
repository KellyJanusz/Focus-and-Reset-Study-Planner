
import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Calendar, 
  Target, 
  FileText, 
  Info, 
  Clock
} from 'lucide-react';
import { AppState, Tab, StudyVision, DailyEntry, WeeklyEntry, Note } from './types';
import VisionView from './components/VisionView';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import NotesView from './components/NotesView';
import InfoView from './components/InfoView';

const STORAGE_KEY = 'teen_guru_press_planner_v1';

const initialVision: StudyVision = {
  studyingNow: '',
  whyMatters: '',
  successIn3Months: '',
  top3Goals: ['', '', ''],
  biggestChallenges: '',
  supportToolsHabits: ''
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Vision);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      vision: initialVision,
      dailyEntries: [],
      weeklyEntries: [],
      notes: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateVision = (vision: StudyVision) => {
    setState(prev => ({ ...prev, vision }));
  };

  const addDailyEntry = (entry: DailyEntry) => {
    setState(prev => ({ ...prev, dailyEntries: [entry, ...prev.dailyEntries] }));
  };

  const deleteDailyEntry = (id: string) => {
    setState(prev => ({ ...prev, dailyEntries: prev.dailyEntries.filter(e => e.id !== id) }));
  };

  const addWeeklyEntry = (entry: WeeklyEntry) => {
    setState(prev => ({ ...prev, weeklyEntries: [entry, ...prev.weeklyEntries] }));
  };

  const deleteWeeklyEntry = (id: string) => {
    setState(prev => ({ ...prev, weeklyEntries: prev.weeklyEntries.filter(e => e.id !== id) }));
  };

  const addNote = (note: Note) => {
    setState(prev => ({ ...prev, notes: [note, ...prev.notes] }));
  };

  const updateNote = (note: Note) => {
    setState(prev => ({
      ...prev,
      notes: prev.notes.map(n => n.id === note.id ? note : n)
    }));
  };

  const deleteNote = (id: string) => {
    setState(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== id) }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Vision:
        return <VisionView vision={state.vision} onUpdate={updateVision} />;
      case Tab.Daily:
        return <DailyView entries={state.dailyEntries} onAdd={addDailyEntry} onDelete={deleteDailyEntry} />;
      case Tab.Weekly:
        return <WeeklyView entries={state.weeklyEntries} onAdd={addWeeklyEntry} onDelete={deleteWeeklyEntry} />;
      case Tab.Notes:
        return <NotesView notes={state.notes} onAdd={addNote} onUpdate={updateNote} onDelete={deleteNote} />;
      case Tab.Info:
        return <InfoView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0e6ff] max-w-md mx-auto shadow-xl ring-1 ring-slate-200">
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
          <img src="logo.png" alt="Teen Guru Press" className="w-full h-full object-contain p-1" onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://img.icons8.com/fluency/96/book.png';
          }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1a237e]">Focus & <span className="text-[#26a69a]">Reset</span></h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Study Planner</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {renderContent()}
      </main>

      <nav className="bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto flex items-center justify-around h-20 px-2 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <NavButton active={activeTab === Tab.Vision} icon={<Lightbulb size={24} />} label="Vision" onClick={() => setActiveTab(Tab.Vision)} />
        <NavButton active={activeTab === Tab.Daily} icon={<Clock size={24} />} label="Daily" onClick={() => setActiveTab(Tab.Daily)} />
        <NavButton active={activeTab === Tab.Weekly} icon={<Calendar size={24} />} label="Weekly" onClick={() => setActiveTab(Tab.Weekly)} />
        <NavButton active={activeTab === Tab.Notes} icon={<FileText size={24} />} label="Notes" onClick={() => setActiveTab(Tab.Notes)} />
        <NavButton active={activeTab === Tab.Info} icon={<Info size={24} />} label="About" onClick={() => setActiveTab(Tab.Info)} />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${active ? 'text-[#1a237e]' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-indigo-50' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default App;