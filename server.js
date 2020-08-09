//Express dependencies
var path = require("path");
var fs = require("fs");
var express = require("express");

//Express variables
var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

//Blank note variable
var notes = [];

//Express routes to pages
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
}
);

app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
}
);

app.get("/api/notes", function(req,res) {
    res.json(notes);
}
);

//Console logs when a successful connection is made
app.listen(PORT, function() {
    console.log("Application is now listening on port" + PORT)
}
);

//Saves a new note
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    notes.push(newNote);
    let data = JSON.stringify(notes)
    fs.writeFile("db/db.json", data, (err) => { 
        if (err) 
            console.log(err); 
        else { 
            res.json(data);
        } 
        }); 
    }
);

//Deletes a saved note
app.delete('/api/notes/:id', function(req,res) {
    var toDelete = req.params.id;
    notes = notes.filter(notes => notes['id'] !== toDelete)
    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => { 
      if (err) 
        console.log(err); 
      else { 
        res.json(notes);
      } 
    }); 
    res.status(200);
  }
  );