import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../context/notes/NoteContext";
import AlertContext from "../../context/alert/AlertContext";
import "./AddNote.css";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const { showAlert } = useContext(AlertContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const handleCloseClick = () => navigate(-1);
  const handleAddClick = async (e) => {
    try {
      e.preventDefault();
      addNote(title, description, tag);
      navigate("/");
      showAlert("Note added successfully", "success");
    } catch (error) {
      console.log("Could not add note.", error.message);
      showAlert("Could not add note", "danger");
    }
  };
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card bg-light" style={{ width: "40rem" }}>
        <div className="d-flex justify-content-between">
          <h3 className="mx-2 mt-2">Add a note</h3>
          <button
            type="button"
            id="close-button"
            className="btn-close mx-2 mt-2"
            aria-label="Close"
            onClick={handleCloseClick}
          ></button>
        </div>
        <hr />
        <div className="container">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="custom-input"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                minLength={3}
                required
              />
            </div>
            <hr />
            <div className="mb-3">
              <textarea
                className="custom-textarea"
                id="description"
                rows="5"
                cols={70}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength={5}
                required
              />
            </div>
            <hr />
            <div className="mb-3">
              <input
                type="text"
                className="custom-input"
                id="tag"
                placeholder="Enter tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <button  disabled={title.length < 3 || description.length < 5} className="btn btn-primary mb-3" onClick={handleAddClick}>
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
