import React from 'react'
import { useState } from 'react'

const Form = ({ addNote }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
  
    const resetForm = () => {
      setTitle('')
      setContent('')
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const note = {
        title: title,
        content: content,
      }
      addNote(note)
      console.log(note)
    }
  
  return (
    <form onSubmit={handleSubmit} id='note-form'>
        <h2>New Note Form</h2>
        <label>
            <span>Enter note title:</span>
            <input 
                type='text' 
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                ></input>
        </label>
        <label>
            <span>Enter note content:</span>
            <textarea
                placeholder='content'
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
        </label>
        <button type='submit'>Post</button>
    </form>
  )
}

export default Form