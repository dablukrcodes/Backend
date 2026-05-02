import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Card = () => {

  const [notes, setNote] = useState([])
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editedDescription, setEditedDescription] = useState('')


  function getNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNote(res.data.notes)
      })
  }
  useEffect(() => {
    getNotes();
  }, [])

  // // database me jitni data h sb ko retrun kr do
  //  axios.get('http://localhost:3000/api/notes')
  //  .then((res)=>{ 
  //  // console.log(res.data.notes)
  //   setNote(res.data.notes)
  //  })


  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    // console.log(title.value, description.value)
    axios.post('http://localhost:3000/api/notes', {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data)
        e.target.reset()
        getNotes();
      })
  }


  function handleDeleteNote(noteId) {
    // console.log(noteId)

    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        getNotes()
      })
  }

  function handleEditNote(note) {
    setEditingNoteId(note._id)
    setEditedDescription(note.description)
  }

  function handleCancelEdit() {
    setEditingNoteId(null)
    setEditedDescription('')
  }

  function handleUpdateNote(noteId) {
    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      description: editedDescription
    })
      .then(res => {
        console.log(res.data)
        handleCancelEdit()
        getNotes()
      })
  }

  return (
    <>

      <form className='note-create-form' onSubmit={handleSubmit}  >
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button>Create note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              {
                editingNoteId === note._id
                  ? <input
                    className='edit-input'
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  : <p>{note.description}</p>
              }
              {
                editingNoteId === note._id
                  ? <div className="note-actions">
                    <button onClick={() => { handleUpdateNote(note._id) }}>save</button>
                    <button onClick={handleCancelEdit}>cancel</button>
                  </div>
                  : <div className="note-actions">
                    <button onClick={() => { handleEditNote(note) }}>edit</button>
                    <button onClick={() => { handleDeleteNote(note._id) }} >delete</button>
                  </div>
              }
            </div>
          })
        }
      </div>
    </>
  )
}

export default Card
