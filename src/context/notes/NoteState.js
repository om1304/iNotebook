import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]); // Initialize notes state as an empty array

  // Fetch all notes from the backend API
  const getAllNotes = async () => {
    const url = `${host}/api/notes/getallnotes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlZWI3NWEzYTYwNGQyMGM5YmU5MzMxIn0sImlhdCI6MTcyNzAzMjY5NH0.PsHy_vOYoxdVboxBeRhlxIdLHxCYIpzx96Sv-LUuE7o",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json(); // Parse the response JSON
      setNotes(json); // Update the notes state with the fetched data
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to add a new note using our backend api at "http://localhost:5000/api/notes/addnote"
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;

    // Create the note object to send in the request body
    const newNote = {
      title,
      description,
      tag,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlZWI3NWEzYTYwNGQyMGM5YmU5MzMxIn0sImlhdCI6MTcyNzAzMjY5NH0.PsHy_vOYoxdVboxBeRhlxIdLHxCYIpzx96Sv-LUuE7o",
          "Content-Type": "application/json",
        },
        // Convert the note object to a JSON string for the body
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      await getAllNotes();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to delete a note using our backend api at "http://localhost:5000/api/notes/deletenote/note._id"
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlZWI3NWEzYTYwNGQyMGM5YmU5MzMxIn0sImlhdCI6MTcyNzAzMjY5NH0.PsHy_vOYoxdVboxBeRhlxIdLHxCYIpzx96Sv-LUuE7o",
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      await getAllNotes();
    } catch (error) {
      console.error(error.message);
    }
  };

  //TODO: pending update note integreation with api 

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
