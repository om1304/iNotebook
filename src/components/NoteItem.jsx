import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alert/AlertContext";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";
import { ReactComponent as UpdateIcon } from "./icons/update.svg";
import Modal from "./Modal";
import Badge from "./Badge";

const NoteItem = (props) => {
  const { note } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { showAlert } = useContext(AlertContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); // To store the note being updated

  // Function to handle delete button click
  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      await deleteNote(note._id);
      showAlert("Note deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete note:", error);
      showAlert("Could not delete note", "danger");
    }
  };

  // Function to handle update button click (opens modal)
  const handleUpdate = () => {
    setSelectedNote(note); // Set the note to be updated
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedNote(null); // Clear the selected note
  };

  return (
    <div className="col-md-3 mt-4">
      <div className="card">
        <Badge tag={note.tag} />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark mx-2" onClick={handleUpdate}>
                <UpdateIcon />
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                <DeleteIcon />
              </button>
            </div>
          </div>
          <hr />
          <p className="card-text">{note.description}</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          show={isModalOpen}
          handleClose={handleCloseModal}
          note={selectedNote}
        />
      )}
    </div>
  );
};

export default NoteItem;
