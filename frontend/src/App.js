import { useState, useEffect, useCallback } from "react";
import Form from './components/form'
import Update from './components/update'
import './index.css'

function App() {
  const [notes, setNotes] = useState([])
  const baseURL = process.env.REACT_APP_API_URL


  const addNote = (note) => {
    setNotes(prevNotes => {
      return [...prevNotes, note]
    })
    fetch('http://127.0.0.1:8000/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      })
    })
  }


  const handleDelete = async (note) => {
    await fetch(`http://127.0.0.1:8000/notes/delete/${note.id}/`, { method: 'DELETE' });
    setNotes(prevNotes => {
      return prevNotes.filter(n => {
        return n.id != note.id
      })
    })

  }


  const updateNote = (id, newTitle) => {

    fetch(`http://127.0.0.1:8000/notes/update/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle
      })
    })

  }



  const fetchData = useCallback(async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/notes/"
    );
    const data = await response.json();
    setNotes(data);
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div className="App">
      {notes.map((note) => (
        <div key={note.id} className='wrapper'>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note)}>Delete</button>
          <Update updateNote={updateNote} id={note.id} />
        </div>
      ))}
      <Form addNote={addNote} />
    </div>
  );
}

export default App;
