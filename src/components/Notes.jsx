import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(NoteContext);
  const {notes, getAllNotes} = context;
  useEffect(() => {
    // Fetch notes on component mount
    getAllNotes();
    // Adding getAllNotes as a dependency so it will be called whenever it changes
  }, [notes, getAllNotes]);
  return (
    <div>
      <h2 className='mt-2'>Your Notes:</h2>
      <div className="row">
      {notes.map(note => {
        return <NoteItem key={note._id} note={note}/>;
      })}
      </div>
    </div>
  )
}

export default Notes
