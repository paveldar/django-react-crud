import React from 'react'
import { useState } from 'react'

const Update = ({ updateNote, id }) => {
    const [update, setUpdate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        updateNote(id, update)
    }



  return (
    <form onSubmit={handleSubmit}>
        <label>
            <span>Update Title</span>
            <input
                type='text'
                onChange={(e) => setUpdate(e.target.value)}
                value={update}
                >
            </input>
        </label>
        
    </form>
  )
}

export default Update