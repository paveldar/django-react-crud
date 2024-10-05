import { useState, useEffect, useCallback } from "react";
import Form from './components/form'
import Update from './components/update'
import './index.css'

function App() {
  const [notes, setNotes] = useState([])
  const apiUrl = '/choreo-apis/djangoreactcrud/backend/v1'
  const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : apiUrl



  const addNote = (note) => {
    setNotes(prevNotes => {
      return [...prevNotes, note]
    })
    fetch(`${baseUrl}/notes/`, {
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
    await fetch(`${baseUrl}/notes/delete/${note.id}/`, { method: 'DELETE' });
    setNotes(prevNotes => {
      return prevNotes.filter(n => {
        return n.id !== note.id
      })
    })

  }


  const updateNote = (id, newTitle) => {

    fetch(`${baseUrl}/notes/update/${id}/`, {
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
      `${baseUrl}/notes/`
    );
    const data = await response.json();
    setNotes(data);
  }, [baseUrl]);


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
