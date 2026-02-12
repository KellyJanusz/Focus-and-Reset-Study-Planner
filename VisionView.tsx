
import React, { useState } from 'react';
import { StudyVision } from '../types';
import { Save, ChevronDown, ChevronRight, Lightbulb, Target, AlertTriangle, ShieldCheck } from 'lucide-react';

interface VisionViewProps {
  vision: StudyVision;
  onUpdate: (vision: StudyVision) => void;
}

const VisionView: React.FC<VisionViewProps> = ({ vision, onUpdate }) => {
  const [localVision, setLocalVision] = useState(vision);
  const [openSections, setOpenSections] = useState<string[]>(['core']);

  const toggleSection = (id: string) => {
    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSave = () => {
    onUpdate(localVision);
    alert('Your Focus & Reset Study Vision has been saved!');
  };

  const updateField = (field: keyof StudyVision, value: any) => {
    setLocalVision(prev => ({ ...prev, [field]: value }));
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...localVision.top3Goals];
    newGoals[index] = value;
    setLocalVision(prev => ({ ...prev, top3Goals: newGoals }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-[#1a237e]">Study Vision</h2>
        <p className="text-slate-500 text-sm italic">"Great things come to those who plan. Let's focus and reset your future today."</p>
      </div>

      <div className="space-y-4">
        <Section 
          id="core" 
          title="The Foundation" 
          isOpen={openSections.includes('core')} 
          onToggle={() => toggleSection('core')}
          icon={<Lightbulb className="text-[#1a237e]" size={20} />}
        >
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">What am I studying right now?</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[80px]"
                placeholder="Subject, course, or specific topic..."
                value={localVision.studyingNow}
                onChange={(e) => updateField('studyingNow', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Why does this matter to me?</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[80px]"
                placeholder="Your motivation, career goals, personal growth..."
                value={localVision.whyMatters}
                onChange={(e) => updateField('whyMatters', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Success in the next 3 months?</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[80px]"
                placeholder="What does 'winning' look like for you?"
                value={localVision.successIn3Months}
                onChange={(e) => updateField('successIn3Months', e.target.value)}
              />
            </div>
          </div>
        </Section>

        <Section 
          id="goals" 
          title="Priorities & Goals" 
          isOpen={openSections.includes('goals')} 
          onToggle={() => toggleSection('goals')}
          icon={<Target className="text-[#1a237e]" size={20} />}
        >
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">My top 3 study goals:</label>
              <div className="space-y-3">
                {localVision.top3Goals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">{i + 1}</span>
                    <input 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder={`Goal #${i + 1}`}
                      value={goal}
                      onChange={(e) => updateGoal(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="support" 
          title="Challenges & Support" 
          isOpen={openSections.includes('support')} 
          onToggle={() => toggleSection('support')}
          icon={<ShieldCheck className="text-[#1a237e]" size={20} />}
        >
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Biggest challenges to manage:
              </label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[80px]"
                placeholder="Distractions, time management, complex topics..."
                value={localVision.biggestChallenges}
                onChange={(e) => updateField('biggestChallenges', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Support, tools, or habits:</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[80px]"
                placeholder="Pomodoro timers, apps, coffee, mentor support..."
                value={localVision.supportToolsHabits}
                onChange={(e) => updateField('supportToolsHabits', e.target.value)}
              />
            </div>
          </div>
        </Section>

        <button 
          onClick={handleSave}
          className="w-full bg-[#1a237e] hover:bg-indigo-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
        >
          <Save size={20} />
          Save Study Vision
        </button>
      </div>
    </div>
  );
};

interface SectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, isOpen, onToggle, icon, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
    <button 
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold text-slate-800">{title}</span>
      </div>
      {isOpen ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
    </button>
    {isOpen && (
      <div className="p-4 border-t border-slate-100 bg-white">
        {children}
      </div>
    )}
  </div>
);

export default VisionView;
