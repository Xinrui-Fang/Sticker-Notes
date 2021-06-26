import Note from './Note';
import AddNote from '../AddNote';

// We are gonna to use NotesLists to hold all the Notes.

const NotesList = ({notes, handleAddNote, handleDeleteNote}) => {
    return (<div className='notes-list'>
        <AddNote handleAddNote={handleAddNote}/>   
        {notes.map((note) => (
            /* Passing things through*/
            <Note 
                id={note.id} 
                text={note.text} 
                date={note.date}
                handleDeleteNote={handleDeleteNote}
            />
        ))}{/* dynamicly map*/}
     
    </div>
    )
};

export default NotesList;