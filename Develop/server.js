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
  res.sendFile(path.join(__dirname, 'public/index.html')
  ));



app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  // console.info(`${req.method} request received to take a note`);
);

//its either the top one or maybe this bottom one //

//app.get('/notes', (req, res) => {
//res.json(`${req.method} request recieved to get notes`)
//console.info(`${req.method} request for notes`)
//});

//maybe neither.. need to present the html and then present the old notes i think 



app.post('/notes', (req, res) => {
  console.info(`${req.body} request to add note`)
  res.json({})
   const { title, text } = req.body;
   console.log(title)
   console.log(text)
  
  //   };
  //  // const newNoteData = json.stringify(newNote);

  //   //  write that stuff to a file now .. or do i need to append it or something? 
  //   //  fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   //   if (err) {
  //   //     console.error(err);
  //   //  } else {

  //   //   const parsedNotes = JSON.parse(data);

  //   //    parsedNotes.push(newNoteData);
  //   //   fs.writeFile(`.db/db.json`, parsedNotes),
  //   //    writeErr
  //   //     ? console.error(writeErr)
  //   //    : console.info('Successfully updated reviews!');
  //   // }
  //   // });

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
  });
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);