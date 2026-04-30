const express = require('express');
const app = express();

app.use(express.json());
const notes = [];

app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.send('Note created');
});

app.get('/notes', (req, res) => {
    res.send(notes);
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});