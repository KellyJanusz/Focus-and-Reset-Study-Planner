
import React, { useState } from 'react';
import { WeeklyEntry } from '../types';
import { Plus, Trash2, Calendar, Target, ListTodo, Shield, Smartphone, HeartPulse, Sparkles } from 'lucide-react';

interface WeeklyViewProps {
  entries: WeeklyEntry[];
  onAdd: (entry: WeeklyEntry) => void;
  onDelete: (id: string) => void;
}

const STRATEGY_OPTIONS = ['Time blocking', 'Study timer', 'Phone limits', 'Short breaks'];
const HABIT_OPTIONS = ['Studied as planned', 'Took breaks', 'Slept well', 'Managed distractions'];

const WeeklyView: React.FC<WeeklyViewProps> = ({ entries, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<WeeklyEntry>>({
    weekOf: '',
    topPriorities: ['', '', '', '', ''],
    strategies: [],
    habits: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: WeeklyEntry = {
      id: crypto.randomUUID(),
      weekOf: newEntry.weekOf || '',
      mainFocus: newEntry.mainFocus || '',
      topPriorities: newEntry.topPriorities || ['', '', '', '', ''],
      nonNegotiables: newEntry.nonNegotiables || '',
      subjectsTopics: newEntry.subjectsTopics || '',
      distractions: newEntry.distractions || '',
      strategies: newEntry.strategies || [],
      motivationReminder: newEntry.motivationReminder || '',
      habits: newEntry.habits || [],
      improvement: newEntry.improvement || ''
    };
    onAdd(entry);
    setShowForm(false);
    setNewEntry({
      weekOf: '',
      topPriorities: ['', '', '', '', ''],
      strategies: [],
      habits: []
    });
  };

  const toggleStrategy = (strat: string) => {
    setNewEntry(prev => {
      const current = prev.strategies || [];
      return {
        ...prev,
        strategies: current.includes(strat) ? current.filter(s => s !== strat) : [...current, strat]
      };
    });
  };

  const toggleHabit = (habit: string) => {
    setNewEntry(prev => {
      const current = prev.habits || [];
      return {
        ...prev,
        habits: current.includes(habit) ? current.filter(h => h !== habit) : [...current, habit]
      };
    });
  };

  const updatePriority = (idx: number, val: string) => {
    const current = [...(newEntry.topPriorities || ['', '', '', '', ''])];
    current[idx] = val;
    setNewEntry(prev => ({ ...prev, topPriorities: current }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-cyan-600 flex items-center gap-2">
            <Calendar className="text-cyan-500" />
            Weekly Plan
          </h2>
          <p className="text-slate-500 text-sm">Strategize your week</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border-2 border-cyan-100 rounded-3xl p-6 shadow-xl space-y-6 animate-in slide-in-from-bottom-4 duration-300 pb-10">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Week of:</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="e.g., Oct 23rd - Oct 29th"
              value={newEntry.weekOf}
              onChange={(e) => setNewEntry(prev => ({ ...prev, weekOf: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Target size={18} className="text-cyan-500" /> Main focus for this week:
            </label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none min-h-[60px]"
              placeholder="Your #1 objective..."
              value={newEntry.mainFocus}
              onChange={(e) => setNewEntry(prev => ({ ...prev, mainFocus: e.target.value }))}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <ListTodo size={18} className="text-cyan-500" /> Top Priorities:
            </label>
            {(newEntry.topPriorities || []).map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400 w-4">{i + 1}.</span>
                <input 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  value={p}
                  onChange={(e) => updatePriority(i, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2 text-rose-500">
              <HeartPulse size={18} /> Non-negotiables (sleep, breaks, health):
            </label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none min-h-[60px]"
              placeholder="What keeps you healthy?"
              value={newEntry.nonNegotiables}
              onChange={(e) => setNewEntry(prev => ({ ...prev, nonNegotiables: e.target.value }))}
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Focus & Strategy</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Subjects or topics this week:</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                value={newEntry.subjectsTopics}
                onChange={(e) => setNewEntry(prev => ({ ...prev, subjectsTopics: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Smartphone size={16} className="text-amber-500" /> Distractions to watch for:
              </label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                value={newEntry.distractions}
                onChange={(e) => setNewEntry(prev => ({ ...prev, distractions: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Strategies I will use:</label>
            <div className="grid grid-cols-2 gap-2">
              {STRATEGY_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleStrategy(opt)}
                  className={`p-2 rounded-xl text-xs font-bold border-2 transition-all ${newEntry.strategies?.includes(opt) ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-500" /> Weekly Habit Snapshot:
            </label>
            <div className="grid grid-cols-1 gap-2 border-2 border-slate-100 rounded-2xl p-3">
              {HABIT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleHabit(opt)}
                  className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition-all ${newEntry.habits?.includes(opt) ? 'text-cyan-600' : 'text-slate-400'}`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${newEntry.habits?.includes(opt) ? 'bg-cyan-600 border-cyan-600' : 'border-slate-300'}`}>
                    {newEntry.habits?.includes(opt) && <Plus size={14} className="text-white rotate-45" />}
                  </div>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Motivation reminder:</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Why you're doing this..."
              value={newEntry.motivationReminder}
              onChange={(e) => setNewEntry(prev => ({ ...prev, motivationReminder: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">One thing I’ll improve next week:</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              value={newEntry.improvement}
              onChange={(e) => setNewEntry(prev => ({ ...prev, improvement: e.target.value }))}
            />
          </div>

          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg active:scale-[0.98]"
            >
              Save Weekly Plan
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Calendar size={40} />
            </div>
            <p className="text-slate-400 font-medium">No weekly plans yet. Map out your next win!</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-slate-800">Week of {entry.weekOf}</h4>
                  <p className="text-xs text-cyan-600 font-bold uppercase tracking-wider">Strategy Card</p>
                </div>
                <button 
                  onClick={() => onDelete(entry.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-cyan-50 p-3 rounded-xl">
                  <span className="text-[10px] font-black uppercase text-cyan-400 block mb-1">Main Focus</span>
                  <p className="text-sm text-cyan-900 font-bold">{entry.mainFocus}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Priorities</span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {entry.topPriorities.filter(p => p).slice(0, 3).map((p, i) => (
                        <li key={i} className="line-clamp-1 flex items-start gap-1">
                          <span className="text-cyan-500 shrink-0">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Habits Hit</span>
                    <div className="flex flex-wrap gap-1">
                      {entry.habits.length > 0 ? entry.habits.map(h => (
                        <span key={h} className="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded-md font-bold">{h}</span>
                      )) : <span className="text-xs text-slate-400">None marked</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeeklyView;
