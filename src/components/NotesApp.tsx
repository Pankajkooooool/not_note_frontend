import React, { useState, useEffect } from "react";
import CreateNote from "./CreateNote";
import NotesList from "./NotesList";
import { fetchNotes } from "../config/api";

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to load notes:", error);
      }
    };

    loadNotes();
  }, []);

  const handleNoteCreated = (newNote: any) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteDeleted = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  return (
    <div>
      <CreateNote onNoteCreated={handleNoteCreated} />
      <NotesList notes={notes} onDelete={handleNoteDeleted} />
    </div>
  );
};

export default NotesApp;
