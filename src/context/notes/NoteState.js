import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66f0737ad3fd1c96f8237b8b",
      "user": "66eeb75a3a604d20c9be9331",
      "title": "Code Tantra",
      "description": "Do the dalali for Code Tantra when no one else does anything and waste my own damn time.",
      "tag": "Dalali",
      "date": "2024-09-22T19:43:54.436Z",
      "__v": 0
    },
    {
      "_id": "66f0737ad3fd1c96f8237b8b",
      "user": "66eeb75a3a604d20c9be9331",
      "title": "Code Tantra",
      "description": "Do the dalali for Code Tantra when no one else does anything and waste my own damn time.",
      "tag": "Dalali",
      "date": "2024-09-22T19:43:54.436Z",
      "__v": 0
    },
    {
      "_id": "66f0737ad3fd1c96f8237b8b",
      "user": "66eeb75a3a604d20c9be9331",
      "title": "Code Tantra",
      "description": "Do the dalali for Code Tantra when no one else does anything and waste my own damn time.",
      "tag": "Dalali",
      "date": "2024-09-22T19:43:54.436Z",
      "__v": 0
    },
    {
      "_id": "66f0737ad3fd1c96f8237b8b",
      "user": "66eeb75a3a604d20c9be9331",
      "title": "Code Tantra",
      "description": "Do the dalali for Code Tantra when no one else does anything and waste my own damn time.",
      "tag": "Dalali",
      "date": "2024-09-22T19:43:54.436Z",
      "__v": 0
    },
    {
      "_id": "66f0737ad3fd1c96f8237b8b",
      "user": "66eeb75a3a604d20c9be9331",
      "title": "Code Tantra",
      "description": "Do the dalali for Code Tantra when no one else does anything and waste my own damn time.",
      "tag": "Dalali",
      "date": "2024-09-22T19:43:54.436Z",
      "__v": 0
    },
  ];
  const [notes, setNotes] = useState(notesInitial)
  return(
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;