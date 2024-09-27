import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
  const a = useContext(NoteContext)
  return (
    <div>
      <h1 className="text-center">About</h1>
      <p className="text-center mt-4">{a.name}</p>
    </div>
  )
}

export default About
