import { useState, useEffect } from "react";

// Fetch Mouse Position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  const obj = {};

  Object.keys(obj);
  console.log(Object.keys(obj).length);

  useEffect(() => {

    if (Object.keys(obj).length == 0)
    {
      window.addEventListener("mousedown", updateMousePosition); // upload mouse position

      return () => window.removeEventListener("mousedown", updateMousePosition); // upload mouse position

    }
    
  }, []);

  return mousePosition;
};

// Invoke (调用) Web Speech API 
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const AddNote = ({handleAddNote}) => {
    const { x, y } = useMousePosition();

    const [noteText, setNoteText] = useState('');
    const [isListening, setIsListening] = useState(false)// default: false

    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
        if (isListening) {
          mic.start() /* Voice API*/
          mic.onend = () => {
            console.log('continue..')
            mic.start()
          }
        } else {
          mic.stop()
          mic.onend = () => {
            console.log('Stopped Mic on Click')
          }
        }
        mic.onstart = () => {
          console.log('Mics on')
        }
    
        mic.onresult = event => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          console.log(transcript)
          setNoteText(transcript)
          mic.onerror = event => {
            console.log(event.error)
          }
        }
      }
    

    /*Type words handle function*/
    const handleChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleSaveClick = () => {
        // If the note is not blank, AddNote.
        if(noteText.trim().length >0){
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    var left = x + 'px';
    var top = y + 'px';

    
    return (
        <div className="note new" /*style={{left, top, position:'absolute'}} */ >
            <textarea 
                rows="8" 
                cols="10" 
                placeholder='Type to add a note...'
                value = {noteText}
                onChange = {handleListen}
            ></textarea>
            <div className="note-footer">
                {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                <button onClick={() => setIsListening(prevState => !prevState)}>
                    Start/Stop
                </button>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>

        </div>
    );
};

export default AddNote;