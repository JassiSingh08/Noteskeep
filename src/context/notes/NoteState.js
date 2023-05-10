import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  //GET ALL NOTES
  const getNotes = async() => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MzUyYzNjMzk0YTk1YzIwNWIxMDRhIn0sImlhdCI6MTY4MzE4NjU4Nn0.3rSKQGE0Lvn8X5sZJxXgHpXJe2gCbzPMK0ax0yCX_XU",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)

  };

  //ADD A NOTE
  const addNote = async(title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MzUyYzNjMzk0YTk1YzIwNWIxMDRhIn0sImlhdCI6MTY4MzE4NjU4Nn0.3rSKQGE0Lvn8X5sZJxXgHpXJe2gCbzPMK0ax0yCX_XU",
      },
      body: JSON.stringify({ title, description, tag }),
    });


    // LOGIC 
    console.log("adding a new note");
    const note = {
      user: "645352c3cbv4a95c205b104a",
      title: title,
      description: description,
      tag: tag,
      _id: "64590fefd0b10ac4aba70aa3",
      date: "2023-05-08T15:06:16.595Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //EDIT A NOTE

  const editNote = async (id, title, description, tag) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MzUyYzNjMzk0YTk1YzIwNWIxMDRhIn0sImlhdCI6MTY4MzE4NjU4Nn0.3rSKQGE0Lvn8X5sZJxXgHpXJe2gCbzPMK0ax0yCX_XU",
      },
      body: JSON.stringify({ title, description, tag }),
    }); 
    const json = response.json();

    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    getNotes(newNotes);
  };

  //DELETE A NOTE
  

  const deleteNote = async (id) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MzUyYzNjMzk0YTk1YzIwNWIxMDRhIn0sImlhdCI6MTY4MzE4NjU4Nn0.3rSKQGE0Lvn8X5sZJxXgHpXJe2gCbzPMK0ax0yCX_XU",
      },
    }); 

    const json = response.json();   
    // console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
