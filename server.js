const express = require('express')
const path = require('path') 
const fs = require('fs')
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//get for index

app.get('/', (req, res) =>
res.sendfile(path.join(_dirname, 'public.index.html))
);


app.get('/', (req, res) => 
console.info(`${req.method} request received to take a note`)
res.status(200).json();
);

//its either the top one or maybe this bottom one //

app.get('/notes', (req, res) => {
  res.json(`${req.method} request recieved to get notes`)
  console.info(`${req.method} request for notes`) 
  });

  app.post('/notes', (req, res) => {
    console.info(`${req.method} request to add review`) 
    const { title, text } = req.body;
     
    if (title && text) {
    const newNote = {
    title,
    text,
    };
    const newNoteData = json.stringify(newNote);
    // write that stuff to a file now .. or do i need to append it or something? 
