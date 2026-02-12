
export interface StudyVision {
  studyingNow: string;
  whyMatters: string;
  successIn3Months: string;
  top3Goals: string[];
  biggestChallenges: string;
  supportToolsHabits: string;
}

export interface DailyEntry {
  id: string;
  date: string;
  day: string;
  subject: string;
  focus: string;
  focusLevel: number;
  energyLevel: 'Low' | 'Medium' | 'High';
  biggestDistraction: string;
  workedWell: string;
  adjustNextTime: string;
  proudOf: string;
  nextPriority: string;
}

export interface WeeklyEntry {
  id: string;
  weekOf: string;
  mainFocus: string;
  topPriorities: string[];
  nonNegotiables: string;
  subjectsTopics: string;
  distractions: string;
  strategies: string[];
  motivationReminder: string;
  habits: string[];
  improvement: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export interface AppState {
  vision: StudyVision;
  dailyEntries: DailyEntry[];
  weeklyEntries: WeeklyEntry[];
  notes: Note[];
}

export enum Tab {
  Vision = 'vision',
  Daily = 'daily',
  Weekly = 'weekly',
  Notes = 'notes',
  Info = 'info'
}
