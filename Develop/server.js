const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./public/helpers/uuid');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
  console.info(`${req.method} request received to take a note`);
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json('Error retrieving notes');
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post('/notes', (req, res) => {
  console.info(`${req.method} request to add note`);
  const { title, text } = req.body;
  const id = uuid();

  if (title && text) {
    const newNote = {
      title,
      text,
      id,
    };

    fs.readFile('./db/db.json', 'utf8', (err, originNotes) => {
     console.log(originNotes)
      if (err) {
        console.error(err);
        res.status(500).json('Error adding note');
      } else {
        const parsedNotes = JSON.parse(originNotes);
        parsedNotes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json('Error adding note');
          } else {
            console.log('Note added successfully');
            res.json(newNote);
          }
        });
      }
    });
  } else {
    res.status(400).json('Incomplete note data');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json('Error retrieving notes');
    } else {
      let notes = JSON.parse(data);

     
      const noteIndex = notes.findIndex((note) => note.id === noteId);

      if (noteIndex !== -1) {
       
        const deletedNote = notes.splice(noteIndex, 1)[0];

       
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json('Error deleting note');
          } else {
            console.log('Note deleted successfully');
            res.status(200).json({ message: 'Note deleted successfully', deletedNote });
          }
        });
      } else {
       
        res.status(404).json({ error: 'Note not found' });
      }
    }
  });
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);