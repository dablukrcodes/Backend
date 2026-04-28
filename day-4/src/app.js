
const express = require("express")
const app = express()


app.use(express.json())

const notes = []
/**
 * POST /note
 * 
 */
app.post("/note" , (req , res)=>{ 
    console.log(req.body)
    notes.push(req.body)

  //  console.log(notes)
    res.send("data created")
})
/**
 * GET /note
 * 
 */
app.get("/note" ,(req,res)=>{ 
    res.send(notes)
})
/**
 * DELETE /note/:index
 * param :index is used to identify the note to be deleted
 * dlete / note/0 => delete the note at index 0
 */
app.delete("/note/:index" , (req,res)=>{ 
  // console.log(req.params.index)

  delete notes[req.params.index]
  res.send("notes deleted successfully")
})

/**
 * PATCH /note/:index
 * param :index is used to identify the note to be updated
 * update / note/0 => update the note at index 0
 * body : { description : "new description" }
 */
app.patch("/note/:index", (req,res)=>{ 
    notes [req.params.index].description = req.body.description
    res.send("Note updated successfully")
})

module.exports = app