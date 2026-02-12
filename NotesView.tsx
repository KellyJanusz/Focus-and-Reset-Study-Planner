
import React, { useState } from 'react';
import { Note } from '../types';
import { Plus, Trash2, FileText, Save, Search, X, Clock } from 'lucide-react';

interface NotesViewProps {
  notes: Note[];
  onAdd: (note: Note) => void;
  onUpdate: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NotesView: React.FC<NotesViewProps> = ({ notes, onAdd, onUpdate, onDelete }) => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const createNewNote = () => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      timestamp: Date.now()
    };
    onAdd(note);
    setEditingNote(note);
  };

  const handleSave = () => {
    if (editingNote) {
      // Update timestamp on save to reflect "Last Edited"
      const updatedNote = {
        ...editingNote,
        timestamp: Date.now()
      };
      onUpdate(updatedNote);
      setEditingNote(null);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (editingNote) {
    return (
      <div className="p-6 h-full flex flex-col space-y-4 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setEditingNote(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
          <button 
            onClick={handleSave}
            className="bg-[#1a237e] text-white font-bold py-2 px-6 rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            <Save size={18} />
            Save
          </button>
        </div>
        <input 
          className="text-2xl font-black text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-300"
          placeholder="Note Title"
          value={editingNote.title}
          onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
        />
        <div className="flex-1">
          <textarea 
            className="w-full h-full text-slate-700 bg-white border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#26a69a] transition-all resize-none shadow-sm"
            placeholder="Start typing your freelance notes here..."
            value={editingNote.content}
            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#1a237e] flex items-center gap-2">
            <FileText className="text-[#26a69a]" />
            Study Notes
          </h2>
          <p className="text-slate-500 text-sm">Freelance thoughts & research</p>
        </div>
        <button 
          onClick={createNewNote}
          className="w-12 h-12 bg-[#1a237e] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#26a69a] outline-none transition-all shadow-sm"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
              <FileText size={40} />
            </div>
            <p className="text-slate-400 font-medium">No notes found. Create your first one!</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div 
              key={note.id} 
              onClick={() => setEditingNote(note)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2 cursor-pointer hover:border-[#26a69a] hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-black text-slate-800 group-hover:text-[#1a237e] transition-colors line-clamp-1 flex-1 pr-2">
                  {note.title || 'Untitled Note'}
                </h4>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                  className="p-1 text-slate-300 hover:text-red-500 transition-colors z-10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {note.content || 'No content yet...'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Clock size={12} className="text-[#26a69a]" />
                Last edited: {formatTimestamp(note.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesView;
