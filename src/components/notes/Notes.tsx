import React, { useState, useEffect } from 'react';

interface NotesProps {
  date: string;
  note: string;
  updateNote: (date: string, content: string) => void;
}

export const Notes: React.FC<NotesProps> = ({ date, note, updateNote }) => {
  const [localNote, setLocalNote] = useState(note);

  // Sync local state when date changes or store note changes from outside
  useEffect(() => {
    setLocalNote(note);
  }, [date, note]);

  const handleBlur = () => {
    if (localNote !== note) {
      updateNote(date, localNote);
    }
  };

  return (
    <div className="notes-panel">
      <header className="notes-header">
        <h2 className="notes-title">Daily Notes</h2>
      </header>
      <div className="notes-content">
        <textarea
          placeholder="Start writing... (Brain dump, rough work, planning)"
          value={localNote || ''}
          onChange={(e) => setLocalNote(e.target.value)}
          onBlur={handleBlur}
          className="notes-textarea"
        />
      </div>
    </div>
  );
};
