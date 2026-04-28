const express = require('express');
const app = express();

app.use(express.json());

const notes = [];

app.post('/notes', (req, res) => {
 console.log(req.body);
  notes.push(note);
  res.send("data created")
})

app.get('/notes', (req, res) => {
  res.send(notes);
})

app.delete('/notes/:id', (req, res) => {
//   console.log(req.params.id);

delete notes[req.params.id];
  res.send("data deleted")
})


app.patch('/notes/:id', (req, res) => {
  notes[req.params.id].description = req.body.description;
  res.send("Note updated Successfully")
})
  
module.exports = app;