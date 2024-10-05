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
    url = `${baseUrl}/notes/`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      })
    })
    console.log(`Add note: ${url}`)
  }


  const handleDelete = async (note) => {
    url = `${baseUrl}/notes/delete/${note.id}/`
    await fetch(url, { method: 'DELETE' });
    setNotes(prevNotes => {
      return prevNotes.filter(n => {
        return n.id !== note.id
      })
    })
    console.log(`Delete note: ${url}`)
  }


  const updateNote = (id, newTitle) => {
    url = `${baseUrl}/notes/update/${id}/`
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle
      })
    })
    console.log(`Update note: ${url}`)

  }



  const fetchData = useCallback(async () => {
    url = `${baseUrl}/notes/`
    const response = await fetch(url);
    const data = await response.json();
    setNotes(data);
    console.log(`Get notes: ${url}`)
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
