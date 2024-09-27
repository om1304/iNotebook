import React from "react";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";
import { ReactComponent as UpdateIcon } from "./icons/update.svg";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 mt-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark mx-2"><UpdateIcon/></button>
              <button className="btn btn-danger"><DeleteIcon/></button>           
            </div>
          </div><hr />
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
