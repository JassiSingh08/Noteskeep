import React ,{ useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "645382231c1a100392391723",
      "user": "645352c3c394a95c205b104a",
      "title": "My title2",
      "description": "MY FIRST NOTE2",
      "tag": "personal",
      "date": "2023-05-04T10:00:03.794Z",
      "__v": 0,
    },
    {
      "user": "645352c3c394a95c205b104a",
      "title": "My title hello",
      "description": " helloooooooooooooooooo MY FIRST NOT E helloo ",
      "tag": "personal",
      "_id": "64590fe860b10ac4aba70aa3",
      "date": "2023-05-08T15:06:16.595Z",
      "__v": 0
    }
  ];
    const [notes, setNotes] = useState(notesInitial)
  return (
    <noteContext.Provider value={{notes, setNotes}}> 
    {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
