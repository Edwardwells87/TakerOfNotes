const express = require('express')
const path = require('path')
const fs = require('fs');
const { randomUUID } = require('crypto');
const app = express();
const PORT = 3002;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//get for index

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')
  ));



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
 console.info(`${req.method} request received to take a note`);
});

//its either the top one or maybe this bottom one //

//app.get('/api/notes', (req, res) => {
//res.json(`${req.method} request recieved to give notes`)
//
//});

//maybe neither.. need to present the html and then present the old notes i think 



app.post('/notes', (req, res) => {
  console.info(`${req.body} request to add note`)
  res.json({})
  const { title, text } = req.body;
  console.log(title)
  console.log(text)
  if (title && text) {
    let newNote = {
      title,
      text,
      id: randomUUID,
    }
    console.log(newNote)
    const newNoteData = JSON.stringify(newNote);
    fs.readFile('./db/db.json', 'utf8', (err, originNotes) => {
      if (err) {
        console.error(err);
      } else {

        const parsedNotes = JSON.parse(originNotes);


        parsedNotes.push(newNoteData);

        stringyNotes = JSON.stringify(parsedNotes)
        fs.writeFile('./db/db.json', stringyNotes, (err) => {
          // Check for any potential errors
          if (err) {
            console.error("didnt work 000000000000000000000");
          } else {
            console.log('Note added successfully');
          }
        });
      }
    });
    //     const response = {
    //            status: 'note added',
    //            body: newNote,
    //          };
    //          res.json(response)
    //          console.log(response);
    //          res.status(201).json(response)
    //         }else {
    //          res.status(500).json('error in posting review')
    // 
  }
}
);




  //   const response = {
  //     status: 'note added',
  //     body: newNote,
  //   };
  //   res.json(response)
  //    console.log(response);
  //    res.status(201).json(response)
  //   }else {
  //    res.status(500).json('error in posting review')
  //   }
  
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
)