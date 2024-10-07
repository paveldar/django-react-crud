import { useState, useEffect, useCallback } from "react";
import Form from './components/form'
import Update from './components/update'
import './index.css'

function App() {
  const [notes, setNotes] = useState([])
  const apiUrl = '/choreo-apis/djangoreactcrud/backend/v1'
  const baseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : apiUrl


// GET ALL NOTES
  const fetchData = async () => {
    const url = `${baseUrl}/notes/`

    try {
      const response = await fetch(url);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    fetchData();
  }, []);



// ADD A NOTE
  const addNote = async (note) => {
    const newNote = {
      title: note.title,
      content: note.content
    }

    try {
      const url = `${baseUrl}/notes/`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
      })
      const data = await response.json()
      setNotes(prevNotes => {
        return [...prevNotes, data]
      })

    } catch (error) {
      console.log(error)
    }

  }

// DELETE A NOTE
  const deleteNote = async (id) => {
    const url = `${baseUrl}/notes/delete/${id}/`

    try {
      await fetch(url, { method: 'DELETE' });
      setNotes(prevNotes => prevNotes.filter((n) => n.id !== id))

    } catch (error) {
      console.log(error)
    }
  }



// UPDATE A NOTE
  const updateNote = async (id, newTitle) => {
    const url = `${baseUrl}/notes/update/${id}/`

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle
        })
      })
      const data = await response.json()
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === id) {
            return data;
          } else {
            return note;
          }
        })
      );

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      {notes.map((note) => (
        <div key={note.id} className='wrapper'>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
          <Update updateNote={updateNote} id={note.id} />
        </div>
      ))}
      <Form addNote={addNote} />
    </div>
  );
}

export default App;
