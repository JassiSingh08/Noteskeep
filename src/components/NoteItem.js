import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-primary">
            {note.tag}
          </span>
          <p className="card-text">{note.description}</p>
          <div className="d-flex">
            <i className="fa-regular fa-pen-to-square"></i>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
