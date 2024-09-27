import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";
import { ReactComponent as UpdateIcon } from "./icons/update.svg";

const NoteItem = (props) => {
  const { note } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  // Function to handle delete button click
  const handleDelete = async () => {
    try {
      await deleteNote(note._id);  // Await the deleteNote function to ensure it completes
      // Optionally: Show a success message or perform additional actions here after deletion
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };
  //TODO: pending update note integreation with api 

  return (
    <div className="col-md-3 mt-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark mx-2">
                <UpdateIcon />
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleDelete}  // Await the async delete function
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <hr />
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
