
import React, { useState } from 'react';
import { DailyEntry } from '../types';
import { Plus, Trash2, Calendar, Smile, Battery, Zap, Sun, Star } from 'lucide-react';

interface DailyViewProps {
  entries: DailyEntry[];
  onAdd: (entry: DailyEntry) => void;
  onDelete: (id: string) => void;
}

const DailyView: React.FC<DailyViewProps> = ({ entries, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<DailyEntry>>({
    date: new Date().toISOString().split('T')[0],
    day: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()),
    focusLevel: 3,
    energyLevel: 'Medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: DailyEntry = {
      id: crypto.randomUUID(),
      date: newEntry.date || '',
      day: newEntry.day || '',
      subject: newEntry.subject || '',
      focus: newEntry.focus || '',
      focusLevel: newEntry.focusLevel || 3,
      energyLevel: newEntry.energyLevel || 'Medium',
      biggestDistraction: newEntry.biggestDistraction || '',
      workedWell: newEntry.workedWell || '',
      adjustNextTime: newEntry.adjustNextTime || '',
      proudOf: newEntry.proudOf || '',
      nextPriority: newEntry.nextPriority || ''
    };
    onAdd(entry);
    setShowForm(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      day: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()),
      focusLevel: 3,
      energyLevel: 'Medium'
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-cyan-600 flex items-center gap-2">
            <Smile className="text-cyan-500" />
            Daily Check-In
          </h2>
          <p className="text-slate-500 text-sm">Track your daily momentum</p>
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
        <form onSubmit={handleSubmit} className="bg-white border-2 border-cyan-100 rounded-3xl p-6 shadow-xl space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-1">Date</label>
              <input 
                type="date"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                value={newEntry.date}
                onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 mb-1">Day</label>
              <input 
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                value={newEntry.day}
                onChange={(e) => setNewEntry(prev => ({ ...prev, day: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Subject / Topic</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="What are you studying?"
                value={newEntry.subject}
                onChange={(e) => setNewEntry(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Today's Focus (Keep it realistic)</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none min-h-[80px]"
                placeholder="Specific goals for today..."
                value={newEntry.focus}
                onChange={(e) => setNewEntry(prev => ({ ...prev, focus: e.target.value }))}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Zap size={16} className="text-amber-500" /> Focus Level
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setNewEntry(prev => ({ ...prev, focusLevel: level }))}
                    className={`flex-1 aspect-square rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all ${newEntry.focusLevel === level ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Battery size={16} className="text-green-500" /> Energy Level
              </label>
              <div className="flex flex-col gap-2">
                {['Low', 'Medium', 'High'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setNewEntry(prev => ({ ...prev, energyLevel: level as any }))}
                    className={`py-1.5 px-3 rounded-lg font-bold text-xs border-2 transition-all ${newEntry.energyLevel === level ? 'bg-green-600 border-green-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Biggest distraction noticed:</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="What pulled your focus away?"
              value={newEntry.biggestDistraction}
              onChange={(e) => setNewEntry(prev => ({ ...prev, biggestDistraction: e.target.value }))}
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-cyan-600 flex items-center gap-2">
              <Sun size={18} /> Quick Reflection
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="What worked well today?"
                value={newEntry.workedWell}
                onChange={(e) => setNewEntry(prev => ({ ...prev, workedWell: e.target.value }))}
              />
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="What I'll adjust next time..."
                value={newEntry.adjustNextTime}
                onChange={(e) => setNewEntry(prev => ({ ...prev, adjustNextTime: e.target.value }))}
              />
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="One thing I'm proud of today..."
                value={newEntry.proudOf}
                onChange={(e) => setNewEntry(prev => ({ ...prev, proudOf: e.target.value }))}
              />
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Next study session priority..."
                value={newEntry.nextPriority}
                onChange={(e) => setNewEntry(prev => ({ ...prev, nextPriority: e.target.value }))}
              />
            </div>
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
              Save Entry
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
            <p className="text-slate-400 font-medium">No check-ins yet. Start your first session!</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-slate-800 flex items-center gap-2">
                    {entry.subject || 'Session'}
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{entry.day}</span>
                  </h4>
                  <p className="text-xs text-cyan-600 font-bold">{entry.date}</p>
                </div>
                <button 
                  onClick={() => onDelete(entry.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-cyan-50 text-cyan-700 p-2 rounded-lg font-bold flex items-center gap-2">
                  <Zap size={14} /> Focus: {entry.focusLevel}/5
                </div>
                <div className="bg-green-50 text-green-700 p-2 rounded-lg font-bold flex items-center gap-2">
                  <Battery size={14} /> Energy: {entry.energyLevel}
                </div>
              </div>

              {entry.focus && (
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Today's Focus</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{entry.focus}</p>
                </div>
              )}

              {entry.proudOf && (
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium italic">
                  <Star size={16} className="text-amber-500 shrink-0" />
                  "{entry.proudOf}"
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyView;
