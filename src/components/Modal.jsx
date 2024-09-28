import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from '../context/alert/AlertContext';

const Modal = ({ show, handleClose, note }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [tag, setTag] = useState(note.tag);

  //getting updateNote function from the Note state created
  const context = useContext(NoteContext);
  const { updateNote } = context;

  //getting showAlert function from the Alert state created
  const { showAlert } = useContext(AlertContext);

  //fumnction to update the note 
  const handleUpdate = async(e) => {
    try {
      e.preventDefault();
      await updateNote(note._id, title, description, tag);
      handleClose();
      showAlert("Note updated successfully", "success");
    } catch (error) {
      console.log("Could not update note.\n",error)
      showAlert("Could not update note", "danger");
    }
  };
  
  if (!show) return null; // If modal is not open, don't render it

  return (
    <div
      className="modal fade show d-block" // Added "d-block" to force it to display
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{border: "2px solid black"}}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Note
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  minLength={3}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="noteDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="noteDescription"
                  rows="5"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="noteTag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTag"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-dark" onClick={handleUpdate}>
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
