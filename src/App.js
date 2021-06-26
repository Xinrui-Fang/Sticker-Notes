import {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import NotesList from "./components/NotesList";
import MousePosition from './functions/useMousePosition ';




const App = () => {
  

  const [notes, setNotes] = useState([
    
    {
    id: nanoid(),
    text: "This is my first note!",
    date: "15/04/2021"
    },
    {
    id: nanoid(),
    text: "This is my second note!",
    date: "16/04/2021"
    },
    
      
  ]); // pass an array

  

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote]; /*add after notes*/
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  }

  return(
  <div className="container">
    <NotesList 
      notes={notes} 
      handleAddNote={addNote}
      handleDeleteNote={deleteNote}
    />
   <MousePosition />
  </div>
  
  
  );
};

export default App;