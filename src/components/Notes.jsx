import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(NoteContext);
  const {notes, setNotes} = context;
  return (
    <div>
      <h2 className='mt-2'>Your Notes:</h2>
      <div className="row">
      {notes.map(note => {
        return <NoteItem note={note}/>;
      })}
      </div>
    </div>
  )
}

export default Notes
